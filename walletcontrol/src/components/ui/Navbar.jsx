import React from 'react'
import "../../styles/Navbar.css"
import NavItem from './NavItem'
import UserService from '../../services/UserService'
import { useNavigate } from 'react-router-dom';


const userService = new UserService();

const Navbar = () => {

    const navigate = useNavigate();

    const makeLogout = (event) =>{
        event.preventDefault();
        userService.logout();
        navigate("/login");
    }
    return (
        <div className="navbar">
            <nav id="navbar">
                <ul className="nav-list">
                    <NavItem destination={"/home"}>INICIO</NavItem>
                    <NavItem destination={"/list"}>LISTAR</NavItem>
                    <NavItem destination={"/create"}>CADASTRAR</NavItem>
                    <NavItem id="teste-logout" onClick={makeLogout}>LOGOUT</NavItem>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar