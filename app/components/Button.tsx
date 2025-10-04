import { text } from "stream/consumers"

export function MenuButton({text}:{text:string}) {
    


    return (
        <button className="btn-menu">{text}</button>
    )

}

export function SwipeGoButton({swipe, and, Go}:{swipe:string, and:string, Go:string}) {

    return (
        <button className="swipe-go-btn"><span className="swipe">{swipe}</span><span className="and">{and}</span><span className="go">{Go}</span></button>
    )
}