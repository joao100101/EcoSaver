import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom'
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Notification from '../../components/ui/Notification';

import '../../styles/List.css'
import Navbar from '../../components/ui/Navbar';
import ContaService from '../../services/ContaService';

const contaService = new ContaService();

export default function ListAll() {


  const [dialog, setDialog] = useState(false);
  const [state, setState] = React.useState({
    contas: {},
    notification: {
      show: false,
      severity: 'success',
      message: ''
    },
    deleteId: null
  })

  const {
    contas,
    notification,
    deleteId
  } = state

  React.useEffect(() => {
    loadData()    // Carrega dos dados do back-end
  }, [])

  async function loadData() {
    try {
      const result = await contaService.findAll();
      if (result) setState({ ...state, contas: await result })

      else throw new Error(`[HTTP ${result.status}] ${result.statusText}`)

    }
    catch (error) {
      console.error(error)
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'categoriaName',
      headerName: 'Categoria',
      width: 200
    },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 200
    },
    {
      field: 'date',
      headerName: 'Data da Compra',
      align: 'center',
      headerAlign: 'center',
      width: 250,
      valueFormatter: params => {
        if (params.value) return format(new Date(params.value), 'dd/MM/yyyy')
        else return ''
      }
    },
    {
      field: 'value',
      headerName: 'Valor',
      width: 150,
      valueFormatter: params => {
        return `R$ ${params.value}`
      }
    },
    {
      field: 'edit',
      headerName: 'Editar',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: params =>
        <Link to={'/edit/' + params.id}>
          <IconButton aria-label="Editar">
            <EditIcon />
          </IconButton>
        </Link>
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: params =>
        <IconButton
          aria-label="Excluir"
          onClick={() => handleDeleteButtonClick(params.id)}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
    }
  ];

  function handleDeleteButtonClick(id) {
    setState({ ...state, deleteId: id})
    setDialog(true)
  }

  async function handleDialogClose(answer) {
    // Fecha a caixa de diálogo de confirmação
    setDialog(false)
    if (answer) {
      try {
        // Faz a chamada ao back-end para excluir o cliente
        const result = await contaService.deleteById(deleteId);
        // Se a exclusão tiver sido feita com sucesso, atualiza a listagem
        if (result) {
          setState({
            ...state, notification: {
              show: true,
              severity: 'success',
              message: 'Exclusão efetuada com sucesso!'
            }
          });
          loadData()
        }


      }
      catch (error) {
        console.error(error)
      }
    }
  }

  const handleNotificationClose = () => {
    window.location.reload();
  }

  return (
    <>
      <div className="list-container">
        <Navbar />
        <Notification
          show={notification.show}
          severity={notification.severity}
          message={notification.message}
          onClose={handleNotificationClose}
        />
        <ConfirmDialog
          title="Confirmar operação"
          open={dialog}
          onClose={handleDialogClose}
        >
          Deseja realmente excluir este item?
        </ConfirmDialog>

        <h1 id='list-title'>
          Listagem de Contas
        </h1>

        <div className="button-create-area">
          <Link to="/create">
            <Button
              className='btn-cadastro'
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddBoxIcon />}
            >
              Adicionar Conta
            </Button>
          </Link>
        </div>


        <Paper elevation={4} sx={{ height: 400, width: '90%' }} className='table-container'>
          <DataGrid
            className='table-content'
            rows={contas}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Paper>
      </div>
    </>
  )
}