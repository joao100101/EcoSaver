import React from 'react'
import "../../styles/Navbar.css"
import { Link } from 'react-router-dom'

const NavItem = ({ children, destination, show = true, id = "", onClick }) => {
    return (
        <>
            {show &&
                <Link to={destination} id={id} onClick={onClick}>
                    <li>{children}</li>
                </Link>
            }
        </>

    )
}

export default NavItem