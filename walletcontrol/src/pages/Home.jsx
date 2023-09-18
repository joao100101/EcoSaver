import React, { useState } from 'react'
import Navbar from '../components/ui/Navbar'
import ContaService from '../services/ContaService'
import { Chart } from "react-google-charts"
import "../styles/home.css"


const contaService = new ContaService();
const Home = () => {

  const [contas, setContas] = useState();
  const [locais, setLocais] = useState();


  const options = {
    title: "Categoria dos Gastos"
  };



  React.useEffect(() => {
    loadData();
  }, [])


  const loadData = async () => {
    const response = await contaService.findAll();
    if (response) {
      const locais = [["Local", "Valor"]];
      const data = [
        ["Categoria", "Valor"]
      ]
      for (let conta of response) {

        let exists = false;
        let localExists = false;
        for (let local of locais) {
          if (local.includes(conta.description)) {
            local[1] = local[1] + conta.value;
            localExists = true;
            break;
          }
        }
        for (let arr of data) {
          if (arr.includes(conta.categoriaName)) {
            arr[1] = arr[1] + conta.value
            exists = true;
            break;
          }
        }
        if (!localExists) {
          locais.push([conta.description, conta.value])
        }
        if (!exists) {
          data.push([conta.categoriaName, conta.value])
        }
      }
      setLocais(locais)
      setContas(data);
    }
    return;
  }

  return (
    <>
      <Navbar />
      <div className="title">
        <h1>Dashboard</h1>
      </div>
      <div className="chart-area">
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={locais}
          options={options}
        />

        <Chart
          chartType="PieChart"
          data={contas}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </>
  )
}

export default Home