import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

import './../../styles/Login.css'

import UserService from '../../services/UserService';
import Waiting from '../../components/ui/Waiting';
import Notification from '../../components/ui/Notification';

import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword
} from '../../utils/Validations';

const userService = new UserService();
const Register = () => {
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
      const response = await userService.cadastrar(form);
      if (response) {
        setNotification({ show: true, severity: 'success', message: "Cadastrado com sucesso!" })
      }
    } catch (err) {
      console.error(err);
      setNotification({ show: true, severity: 'error', message: err.response.data })
    } finally {
      setWaiting(false)
    }
  }

  const validadorInput = () => {
    return validateEmail(form.email)
      && validatePassword(form.password)
      && validateConfirmPassword(form.password, form.confirmPassword)
      && validateName(form.name)
  }

  async function handleNotificationClose() {
    const status = notification.severity
    const authenticate = await userService.logar({ email: form.email, password: form.password })

    // Fecha a barra de notificação
    setNotification({
      show: false,
      severity: status,
      message: ''
    }
    )
    // Volta para a página de listagem
    if (authenticate) navigate('/home', { relative: 'path' })
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
        <div className="register-area">
          <div className="login-form-area">
            <h1 id='login-title'>CADASTRO</h1>
            <form>
              <div className="form-group">
                <input type="text" name="name" className="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Seu nome" onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="text" name="username" className="form-control" id="nameInput" aria-describedby="userNameHelp" placeholder="Nome de Usuario" onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="email" name="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="seu_email@example.com" onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="password" name="password" className="form-control" id="passwordInput" placeholder="Senha" onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="password" name="confirmPassword" className="form-control" id="passwordInput" placeholder="Confirma Senha" onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary" id='btn-login' onClick={handleSubmit} disabled={waiting == true || !validadorInput()}>CADASTRAR</button>
              <div className="register-btn-area">
                <label className='register-label'>Já é membro?</label>
                &nbsp;<Link to="/login" id='register'>Logar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register