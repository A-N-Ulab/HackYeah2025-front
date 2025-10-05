import Auth from "@/app/hooks/Auth";
import { MenuButton } from "./components/Button";
import { SwipeGoButton } from "./components/Button";
import { InfoButton } from "./components/Button";
import {useRouter} from "next/navigation";


export default function Home() {

    const router = useRouter()

    return (
        <Auth>
            <div className="w-full h-full">
            <div className="menu-container">
                
                <SwipeGoButton swipe="SWIPE" and="&" Go="GO"/>
                <MenuButton text="Saved"/>
                <MenuButton text="Plan"/>
                <button onClick={() => router.push("/info")}><InfoButton text={<img  className="info-icon" src="./icons/infoYellow.png" alt="Info" />} /></button>
            </div>
            

            </div>
        </Auth>
    )
}
