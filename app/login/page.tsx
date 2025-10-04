'use client'

import {useEffect, useState} from "react";
import {loginUserQuery} from "@/app/api/userApi";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {getCookie, setCookie} from "@/app/utils/cookies";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (getCookie("Token"))
            router.push("/")
    }, [getCookie("Token")])

    const submit = async () => {
        if (!username || !password) {
            setError("Wypełnij wszystkie pola")
            return
        }

        setIsLoading(true)

        const res = await loginUserQuery(username, password)

        if (res.token) {
            router.push("/")
            setCookie("Token", res.token)
            setError("")
        } else {
            setError("Wrong username or password")
        }

        setUsername("")
        setPassword("")
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-neutral-root">
            <div className="w-full max-w-md">
                <div className="login-card relative bg-card-root p-6 sm:p-8">
                    <div className="image-area mx-auto mb-8">
                        <div className="image-placeholder flex items-center justify-center">
                            <Image src="./icons/Logo_wide_version.png" alt="logo" width={700} height={100}/>
                        </div>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submit();
                        }}
                        className="space-y-4"
                        aria-live="polite"
                    >
                        <label className="sr-only" htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            required
                            className="input-base"
                        />

                        <label className="sr-only" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            required
                            className="input-base"
                        />

                        {!isLoading && error && (
                            <p className="error-text">
                                {error}
                            </p>
                        )}

                        {isLoading && (
                            <p className="loading-text">Loading...</p>
                        )}

                        <button
                            type="submit"
                            className="w-full mt-2 btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
