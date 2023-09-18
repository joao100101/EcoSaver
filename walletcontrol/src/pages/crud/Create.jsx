import React, { useState } from 'react'
import Navbar from '../../components/ui/Navbar'
import "../../styles/Create.css"
import ContaService from '../../services/ContaService';
import Waiting from '../../components/ui/Waiting';
import Notification from '../../components/ui/Notification';
import { useNavigate } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field'

const contaService = new ContaService();

const Create = () => {
    const [waiting, setWaiting] = useState(false)
    const [gasto, setGasto] = useState({
        description: '',
        value: '',
        date: [],
        categoriaName: ''
    });





    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        notification: {
            show: false,
            severity: 'success',
            message: ''
        }
    })


    const handleChange = (event) => {
        setGasto({ ...gasto, [event.target.name]: event.target.value })
        console.log(gasto)
    }

    const handleSubmit = async () => {
        setWaiting(true);
        const valid = await validateConta();
        if (valid) {
            console.log(gasto)
            try {
                const response = await contaService.addConta(gasto);
                if (response) {
                    setNotification({ show: true, severity: 'success', message: "Conta adicionada com sucesso!" })
                }
            } catch (err) {
                let code = (err.response != undefined ? err.response.status : err.code)
                let errorMessage = (err.response != undefined) ? `[${code}] ${err.response.data.message}` : `[${code}] ${err.message}`;

                if (errorMessage.includes("undefined")) {
                    switch (code) {
                        case 403:
                            errorMessage = `[${code}] Erro, operação não autorizada.`
                            break;
                        case 400:
                            errorMessage = `[${code}] Erro de validação do formulário.`
                            break;
                        case 500:
                            errorMessage = `[${code}] Ocorreu um erro interno.`
                            break;
                        case undefined:
                            errorMessage = `Ocorreu um erro inesperado.`
                            break;
                        default:
                            errorMessage = `[${code}] Ocorreu um erro inesperado.`
                            break;
                    }
                }

                console.error(errorMessage);
                console.error(err);
                setNotification({ show: true, severity: 'error', message: errorMessage })
            }
        } else {
            console.error("Form Conta invalida.")
            setNotification({ show: true, severity: 'error', message: "Verifique os valores do formulário e tente novamente." })
            return;
        }
    }

    function handleNotificationClose() {
        const status = notification.severity
        setWaiting(false)
        // Fecha a barra de notificação
        setNotification({
            show: false,
            severity: status,
            message: ''
        }
        )

        // Volta para a página de listagem
        if (status === 'success') navigate('/list', { relative: 'path' })
    }

    const validateConta = async () => {
        let conta = gasto;
        let validCategories = ["Alimentacao", "Saude", "Lazer", "Contas Fixas", "Servicos"]


        if (conta != null && conta != undefined) {

            let isCategoriaValid = (conta.categoriaName != null && conta.categoriaName != undefined && validCategories.includes(conta.categoriaName));
            let isDescriptionValid = (conta.description != null && conta.description != undefined && conta.description.length > 3);
            let isDateValid = (conta.date != null && conta.date != undefined);
            let isValueValid = (conta.value != null && conta.value != undefined);
            return isCategoriaValid && isDateValid && isValueValid && isDescriptionValid;
        }

        return false;


    }

    const handlePriceChange = (event) => {
        setGasto({ ...gasto, value: event})
        console.log(gasto)
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <Waiting show={waiting} />
                <Notification
                    show={notification.show}
                    severity={notification.severity}
                    message={notification.message}
                    onClose={handleNotificationClose}
                />
                <div className="form-area">
                    <h1 id="title">Criar Conta</h1>
                    <form id="form">
                        <div className="form-group">
                            <select className="form-select" id="categoria" name="categoriaName" aria-label="Select categoria" onChange={handleChange} required>
                                <option defaultValue>Seleciona uma categoria</option>
                                <option value="Alimentacao">Alimentacao</option>
                                <option value="Saude">Saude</option>
                                <option value="Lazer">Lazer</option>
                                <option value="Contas Fixas">Contas Fixas</option>
                                <option value="Servicos">Servicos</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Descricao do Gasto</label>
                            <input type="text" className="form-control" name='description' id="desc" aria-describedby="desc"
                                placeholder="Supermercado Carol" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Data</label>
                            <input type="date" className="form-control" id="date" name='date' aria-describedby="date"
                                placeholder="14/01/2023" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-value">Valor gasto</label>
                            <CurrencyInput
                                prefix="R$ "
                                placeholder='R$ 00.00'
                                className='form-control'
                                id="input-value"
                                name="input-value"
                                decimalSeparator='.'
                                decimalsLimit="2"
                                onValueChange={handlePriceChange}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" id="botao" onClick={handleSubmit}>ADICIONAR</button>
                        <button type='button' className='btn btn-primary' onClick={() => { navigate("/home") }}>VOLTAR</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Create