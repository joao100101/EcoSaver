import axios from 'axios';

export default class ContaService {
    constructor() {
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_REACT_APP_LOGIN_API,
        })

    }




    async findAll() {
        const { data } = await this.axios.get("/api/contas");
        if (data) {
            return data;
        }
        return;
    }

    async findById(id) {
        const { data } = await this.axios.get(`/api/contas/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } });
        if (data) {
            return data;
        }
        return;
    }

    async updateById(id, formData) {
        const { data } = await this.axios.put(`/api/contas/${id}`, formData, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        });
        if (data) {
            return data;
        }
        return;
    }

    async deleteById(id) {
        const { response } = await this.axios.delete(`/api/contas/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
        if (response) {
            return response;
        }

        return;
    }

    async addConta(dados) {
        const { data } = await this.axios.post('/api/contas', dados);
        if (data) {
            console.log(data)

            return true;
        }
    }


}