import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";



export default function InfoPage() {

    return (
        <div className="info-container">
            <a href="/" className="hamburger-menu">
                <img src="/icons/UpArrow.png" alt="Menu" />
            </a>
           <img src="./icons/Logo_wide_version.png" alt="Info" />

        <div className="info-content">
            <div className="info-text">
                <h1>Swipe & Go Quick Guide</h1>

                <p>Use these four simple gestures on the current Place Card:</p>

                <p>Swipe Right: Like the place and move to the next suggestion.</p>

                <p>Swipe Left: Skip the place and move to the next suggestion.</p>

                <p>Swipe Down: Open the details panel to read more info, like the address and hours.</p>

                <p>Swipe Up: Start navigation to the place immediately.</p>
            </div>
            <div className="info-text">Tam, gdzie diabeł mówi dobranoc</div>
        </div>
           
        </div>
    );
}
