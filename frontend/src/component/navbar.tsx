import { Link } from "react-router-dom"

import"./navbar.css" 
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {

    const [ menu , setMenu ] = useState(false)

    return (
        <>
            <nav>
                <h1 className="title">Driver</h1>
                <div className="menu" onClick={() => setMenu(!menu)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menu ? "open" : ""}>
                    <li>
                        <NavLink to="/ride/estimate">Solicitação de viagem</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ride/:customer_id">Histórico de viagem</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};