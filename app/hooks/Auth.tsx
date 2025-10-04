'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {getCookie} from "@/app/utils/cookies";

export default function Auth({children,}: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter()

    useEffect(() => {
        if (!getCookie("Token"))
            router.push("/login")
    }, [getCookie("Token")])

    return <> {children} </>
}
