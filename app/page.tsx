

import Auth from "@/app/hooks/Auth";
import { MenuButton } from "./components/Button";
import { SwipeGoButton } from "./components/Button";
import { InfoButton } from "./components/Button";    


export default function Home() {



    return (
        <Auth>
            <div className="w-full h-full">
            <div className="menu-container">
                
                <SwipeGoButton swipe="SWIPE" and="&" Go="GO"/>
                <MenuButton menus="/saved" text="Zapisane"/>
                <MenuButton menus="/planning" text="Planuj"/>
                <InfoButton text={<img  className="info-icon" src="./icons/infoYellow.png" alt="Info" />} />
            </div>
            

            </div>
        </Auth>
    )
}
