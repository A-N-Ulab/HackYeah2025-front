export const setCookie = (name: string, value: string, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${value} expires=${expires} path=/`
}

export const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null

    const match = document.cookie.match(
        new RegExp("(^|;)\\s*" + name + "=([^;]+)")
    )

    if (!match) return null

    const rawValue = decodeURIComponent(match[2])
    const tokenOnly = rawValue.split(" ")[0]

    return tokenOnly
}


export const deleteCookie = (name: string) => {
    document.cookie = `${name}= Max-Age=0 path=/`
}