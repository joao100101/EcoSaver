import axios from 'axios';

export default class UserService {
    constructor() {
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_REACT_APP_LOGIN_API,
        })
    }

    async logar(dados) {
        const { data } = await this.axios.post('/auth/login', dados);
        if (data) {
            localStorage.setItem("email", dados.email);
            localStorage.setItem("token", data.token);

            return true;
        }
        return;
    }

    usuarioAutenticado() {
        return localStorage.getItem("token") != undefined;
    }

    async cadastrar(dados) {
        let newUser =
        {
            name: dados.name,
            email: dados.email,
            username: dados.username,
            password: dados.password
        }
        console.log(newUser)
        return this.axios.post('auth/register', newUser)
    }


    async logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("nome")
        localStorage.removeItem("email")
    }

}