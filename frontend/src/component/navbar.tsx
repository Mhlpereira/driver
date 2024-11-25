import { Link } from "react-router-dom"

import"./navbar.css" 

export const Navbar = () => {
    return (
        <>
            <nav>
                <h1 className="title">Shopper</h1>
                <ul>
                    <li>
                        <Link to="">Solicitação de viagem</Link>
                    </li>
                    <li>
                        <Link to="">Opções de viagem</Link>
                    </li>
                    <li>
                        <Link to="">Histórico de viagem</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};