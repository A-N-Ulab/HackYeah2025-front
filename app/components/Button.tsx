'use client';

import React from "react"
import { text } from "stream/consumers"
import { useRouter } from "next/navigation";

export function MenuButton({text}:{text:string}) {
    const router = useRouter()
    return (
        <button onClick={() => router.push("/trips")} className="btn-menu">{text}</button>
    )

}

export function SwipeGoButton({swipe, and, Go}:{swipe:string, and:string, Go:string}) {
    const router = useRouter()
    return (
        <button onClick={() => router.push("/trip")} className="swipe-go-btn"><span className="swipe">{swipe}</span><span className="and">{and}</span><span className="go">{Go}</span></button>
    )
}

export function InfoButton({text}:{text:any}) {
    const router = useRouter()
    return (
        <button onClick={() => router.push("/info")} className="info-btn">{text}</button>
    )

}