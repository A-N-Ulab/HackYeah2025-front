import Auth from "@/app/hooks/Auth";
import { MenuButton } from "./components/Button";
import { SwipeGoButton } from "./components/Button";
export default function Home() {
    return (
        <Auth>
            <div className="w-full h-full">
            <div className="menu-container">
                
                <SwipeGoButton swipe="SWIPE" and="&" Go="GO"/>
                <MenuButton text="Saved"/>
                <MenuButton text="Plan"/>
                <img  className="info-icon" src="./icons/infoYellow.png" alt="Info" />
                
            </div>
            

            </div>
        </Auth>
    )
}
