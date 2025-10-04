'use client'

import {useState} from "react";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const submit = () => {
        if (!username || !password) {
            setError("Wypełnij wszystkie pola")
            return
        }

        console.log("submit")
    }

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
            />
            <p>{error}</p>
            <button onClick={submit}>Login</button>
        </div>
    );
}
