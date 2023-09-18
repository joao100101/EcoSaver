import React from 'react'
import Routering from './Routes'
import UserService from '../services/UserService'
import Redirect from '../pages/Redirect';

const userService = new UserService();

const ProtectedRoutes = ({children}) => {
    const authenticated = userService.usuarioAutenticado();
    
    return authenticated ? children : <Redirect/>

}

export default ProtectedRoutes