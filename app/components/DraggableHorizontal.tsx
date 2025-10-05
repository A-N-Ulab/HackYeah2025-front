import React, {
    forwardRef,
    useRef,
    useImperativeHandle,
    useEffect,
    useCallback,
} from "react";

export type DraggableHandle = {
    swipe: (direction?: 1 | -1 | "up") => void;
};

export type SwipeDirection = 1 | -1 | "up";

interface Props {
    children: React.ReactNode;
    threshold?: number; // horizontal threshold (px)
    verticalThreshold?: number; // vertical threshold for swipe up (px)
    swipeOutDistance?: number;
    onSwipe?: (direction: SwipeDirection) => void; // 1 | -1 | "up"
    onDrag?: (x: number, y: number) => void; // notify parent of x and y
    onCancel?: () => void;
    allowUpSwipe?: boolean; // default true
    className?: string;
}

type StateRef = {
    dragging: boolean;
    pointerId: number | null;
    startX: number;
    startY: number;
    translateX: number;
    translateY: number;
    raf: number;
    animatingOut: boolean;
};

const DraggableHorizontal = forwardRef<DraggableHandle, Props>(function DraggableHorizontal(
    {
        children,
        threshold = 100,
        verticalThreshold = 120,
        swipeOutDistance = 1200,
        onSwipe = () => {},
        onDrag = () => {},
        onCancel = () => {},
        allowUpSwipe = true,
        className = "",
    },
    ref
) {
    const elRef = useRef<HTMLDivElement | null>(null);
    const state = useRef<StateRef>({
        dragging: false,
        pointerId: null,
        startX: 0,
        startY: 0,
        translateX: 0,
        translateY: 0,
        raf: 0,
        animatingOut: false,
    });

    const applyTransform = useCallback(() => {
        const el = elRef.current;
        if (!el) return;
        // rotate only based on horizontal translate for nicer UX
        el.style.transform = `translate(${state.current.translateX}px, ${state.current.translateY}px) rotate(${state.current.translateX * 0.08}deg)`;
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            swipe(direction: 1 | -1 | "up" = 1) {
                const el = elRef.current;
                if (!el || state.current.animatingOut) return;
                state.current.animatingOut = true;
                el.style.transition = "transform 0.35s ease-out, opacity 0.35s ease-out";

                if (direction === "up") {
                    // animate up
                    state.current.translateY = -swipeOutDistance;
                    state.current.translateX = 0;
                } else {
                    state.current.translateX = direction * swipeOutDistance;
                    state.current.translateY = 0;
                }
                applyTransform();

                const onEnd = () => {
                    el.removeEventListener("transitionend", onEnd);
                    state.current.animatingOut = false;
                    onSwipe(direction);
                    el.style.transition = "";
                    state.current.translateX = 0;
                    state.current.translateY = 0;
                    applyTransform();
                };

                el.addEventListener("transitionend", onEnd);
            },
        }),
        [applyTransform, onSwipe, swipeOutDistance]
    );

    useEffect(() => {
        return () => {
            if (state.current.raf) cancelAnimationFrame(state.current.raf);
        };
    }, []);

    const start = (clientX: number, clientY: number, pointerId?: number) => {
        if (state.current.animatingOut) return;
        state.current.dragging = true;
        state.current.pointerId = pointerId ?? null;
        state.current.startX = clientX;
        state.current.startY = clientY;
        const el = elRef.current;
        if (el) el.style.transition = "none";
    };

    const move = (clientX: number, clientY: number) => {
        if (!state.current.dragging) return;
        const dx = clientX - state.current.startX;
        const dy = clientY - state.current.startY;

        // block dragging downwards: allow dy only if <= 0 (upwards) OR allow small positive for natural movement?
        const allowedDy = dy <= 0 ? dy : 0;

        state.current.translateX = dx;
        state.current.translateY = allowedDy;

        if (!state.current.raf) {
            state.current.raf = requestAnimationFrame(() => {
                applyTransform();
                state.current.raf = 0;
                onDrag(state.current.translateX, state.current.translateY);
            });
        }
    };

    const end = () => {
        if (!state.current.dragging) return;
        state.current.dragging = false;
        const tx = state.current.translateX;
        const ty = state.current.translateY;
        const absX = Math.abs(tx);
        const el = elRef.current;
        if (el) el.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";

        // First, check vertical "up" swipe (if enabled)
        if (allowUpSwipe && ty < -verticalThreshold) {
            state.current.animatingOut = true;
            // animate up off-screen
            state.current.translateY = -swipeOutDistance;
            state.current.translateX = 0;
            applyTransform();

            const onEnd = () => {
                if (!el) return;
                el.removeEventListener("transitionend", onEnd);
                state.current.animatingOut = false;
                onSwipe("up");
                el.style.transition = "";
                state.current.translateX = 0;
                state.current.translateY = 0;
                applyTransform();
            };

            // @ts-ignore
            el.addEventListener("transitionend", onEnd);
            return;
        }

        // If vertical movement was downward (>0), we always snap back (no downward swipe)
        if (ty > 0) {
            // snap back
            state.current.translateX = 0;
            state.current.translateY = 0;
            applyTransform();
            const clear = () => {
                if (!el) return;
                el.removeEventListener("transitionend", clear);
                el.style.transition = "";
                onCancel();
            };
            el?.addEventListener("transitionend", clear);
            return;
        }

        // Otherwise evaluate horizontal swipe
        if (absX > threshold) {
            const direction: 1 | -1 = tx > 0 ? 1 : -1;
            state.current.animatingOut = true;
            state.current.translateX = direction * swipeOutDistance;
            state.current.translateY = 0;
            applyTransform();

            const onEnd = () => {
                if (!el) return;
                el.removeEventListener("transitionend", onEnd);
                state.current.animatingOut = false;
                onSwipe(direction);
                el.style.transition = "";
                state.current.translateX = 0;
                state.current.translateY = 0;
                applyTransform();
            };

            // @ts-ignore
            el.addEventListener("transitionend", onEnd);
        } else {
            // snap back
            state.current.translateX = 0;
            state.current.translateY = 0;
            applyTransform();

            const clear = () => {
                if (!el) return;
                el.removeEventListener("transitionend", clear);
                el.style.transition = "";
                onCancel();
            };
            el?.addEventListener("transitionend", clear);
        }
    };

    // pointer handlers
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const p = e;
        try {
            elRef.current?.setPointerCapture(p.pointerId);
        } catch {
            /* ignore */
        }
        start(p.clientX, p.clientY, p.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (state.current.pointerId != null && e.pointerId !== state.current.pointerId) return;
        move(e.clientX, e.clientY);
    };

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        try {
            elRef.current?.releasePointerCapture(e.pointerId);
        } catch {
            /* ignore */
        }
        end();
    };
    
    const handleBinClick = () => {
        onSwipe(-1)
    }

    const handleBackpackClick = () => {
        onSwipe(1)
    }

    return (
        <>
            <div className="bin" onClick={handleBinClick}>
                <img src="./icons/redArrow.png" alt="Decline" />
                <img src="./icons/Trash.png" alt="Trash" />
            </div>
            <div      
                ref={elRef}
                className={`draggable-horizontal ${className}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                style={{ touchAction: "none" }}
            >   
                {children}
            </div>
            <div className="backpac" onClick={handleBackpackClick}>
                <img src="./icons/frrenArrow.png" alt="Accept" />
                <img src="./icons/accept.png" alt="Backpack" />
            </div>
        </>
    );
});

export default DraggableHorizontal;
