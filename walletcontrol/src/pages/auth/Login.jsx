import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import '../../styles/Login.css'

import { validateEmail, validatePassword } from '../../utils/Validations';
import UserService from '../../services/UserService';
import Waiting from '../../components/ui/Waiting';
import Notification from '../../components/ui/Notification';

const userService = new UserService();

const Login = () => {

    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        notification: {
            show: false,
            severity: 'success',
            message: ''
        }
    })
    const [waiting, setWaiting] = useState(false)
    const [form, setForm] = useState([]);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setWaiting(true);
        try {
            const response = await userService.logar(form);
            if (response) {
                setNotification({ show: true, severity: 'success', message: "Logado com sucesso!" })
            }
        } catch (err) {
            let errorMessage = (err.response != undefined ? err.response.data.message : "Houve um erro de conexao com o servidor.");
            console.error(errorMessage);

            setNotification({ show: true, severity: 'error', message: errorMessage })
        }
    }

    const validatingLogin = () => {
        return validateEmail(form.email) && validatePassword(form.password);
    }

    function handleNotificationClose() {
        const status = notification.severity

        // Fecha a barra de notificação
        setNotification({
            show: false,
            severity: status,
            message: ''
        }
        )
        setWaiting(false)
        // Volta para a página de listagem
        if (status === 'success') navigate('/home', { relative: 'path' })
    }

    return (
        <>
            <div className="login-container">
                <Waiting show={waiting} />
                <Notification
                    show={notification.show}
                    severity={notification.severity}
                    message={notification.message}
                    onClose={handleNotificationClose}
                />
                <div className="login-area">
                    <div className="login-form-area">
                        <h1 id='login-title'>LOGIN</h1>
                        <form>
                            <div className="form-group">
                                <input type="email" name="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="example@example.com" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" id="passwordInput" placeholder="Senha" onChange={handleChange} />
                                <Link to="/forgot" className='forgot-password'>Esqueceu a senha?</Link>
                            </div>
                            <button type="submit" className="btn btn-primary" id='btn-login' onClick={handleSubmit} disabled={waiting == true || !validatingLogin()}>LOGIN</button>
                            <div className="register-btn-area">
                                <label className='register-label'>Não é membro?</label>
                                &nbsp;<Link to="/register" id='register'>Cadastre-se</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login