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
                <h1>Swipe & Go Krótki Przewodnik</h1>

                <p>Użyj tych trzech prostych gestów na aktualnej karcie miejsca:</p>

                <p>Przesuń w prawo: Polub miejsce i przejdź do następnej propozycji.</p>

                <p>Przesuń w lewo: Pomiń miejsce i przejdź do następnej propozycji.</p>

                <p>Przycisk GO: Rozpocznij nawigację do miejsca natychmiast.</p>
            </div>
            <div className="info-text">Tam, gdzie diabeł mówi dobranoc</div>
        </div>
           
        </div>
    );
}
