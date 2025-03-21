import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { IEContext } from '../context/IEContext';

const validationSchema = Yup.object({
  no_municipio: Yup.string().required("Município é obrigatório"),
  sg_uf: Yup.string().required("UF é obrigatório"),
  no_mesorregiao: Yup.string().required("Macrorregião é obrigatória"),
  no_microrregiao: Yup.string().required("Microrregião é obrigatória"),
  no_entidade: Yup.string().required("Entidade é obrigatória"),
  qt_mat_bas: Yup.number().required("Quantidade de matrículas é obrigatória").positive("Deve ser um número positivo"),
});

const ClientesTable = () => {
  const { clientes, setClientes } = useContext(IEContext);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clientes');
        setClientes(response.data);
      } catch (error) {
        toast.error("Erro ao carregar os clientes.");
        console.error(error);
      }
    };

    fetchClientes();
  }, [setClientes]);

  const handleEditarCliente = (cliente) => {
    setClienteEditando(cliente);
    setShowModal(true);
  };

  const handleExcluirCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/clientes/${id}`);
      setClientes(clientes.filter(cliente => cliente.id !== id));
      toast.success("Cliente excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir cliente.");
      console.error(error);
    }
  };

  const handleSalvarCliente = async (values, { resetForm }) => {
    try {
      if (clienteEditando) {
        const response = await axios.put(`http://localhost:3000/clientes/${clienteEditando.id}`, values);
        setClientes(clientes.map(cliente =>
          cliente.id === clienteEditando.id ? response.data : cliente
        ));
        toast.success("Cliente editado com sucesso!");
      } else {
        const response = await axios.post('http://localhost:3000/clientes', values);
        setClientes([...clientes, response.data]);
        toast.success("Cliente adicionado com sucesso!");
      }
      setShowModal(false);
      setClienteEditando(null);
      resetForm();
    } catch (error) {
      toast.error("Erro ao salvar cliente.");
      console.error(error);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Município</th>
            <th>UF</th>
            <th>Macrorregião</th>
            <th>Microrregião</th>
            <th>Entidade</th>
            <th>Qt. Matrículas</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.no_municipio}</td>
              <td>{cliente.sg_uf}</td>
              <td>{cliente.no_mesorregiao}</td>
              <td>{cliente.no_microrregiao}</td>
              <td>{cliente.no_entidade}</td>
              <td>{cliente.qt_mat_bas}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEditarCliente(cliente)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleExcluirCliente(cliente.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{clienteEditando ? 'Editar Cliente' : 'Adicionar Cliente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              no_municipio: clienteEditando ? clienteEditando.no_municipio : '',
              sg_uf: clienteEditando ? clienteEditando.sg_uf : '',
              no_mesorregiao: clienteEditando ? clienteEditando.no_mesorregiao : '',
              no_microrregiao: clienteEditando ? clienteEditando.no_microrregiao : '',
              no_entidade: clienteEditando ? clienteEditando.no_entidade : '',
              qt_mat_bas: clienteEditando ? clienteEditando.qt_mat_bas : '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSalvarCliente}
            enableReinitialize
          >
            {() => (
              <form>
                <div className="mb-3">
                  <label htmlFor="no_municipio" className="form-label">Município</label>
                  <Field type="text" id="no_municipio" name="no_municipio" className="form-control" />
                  <ErrorMessage name="no_municipio" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="sg_uf" className="form-label">UF</label>
                  <Field type="text" id="sg_uf" name="sg_uf" className="form-control" />
                  <ErrorMessage name="sg_uf" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="no_mesorregiao" className="form-label">Macrorregião</label>
                  <Field type="text" id="no_mesorregiao" name="no_mesorregiao" className="form-control" />
                  <ErrorMessage name="no_mesorregiao" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="no_microrregiao" className="form-label">Microrregião</label>
                  <Field type="text" id="no_microrregiao" name="no_microrregiao" className="form-control" />
                  <ErrorMessage name="no_microrregiao" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="no_entidade" className="form-label">Entidade</label>
                  <Field type="text" id="no_entidade" name="no_entidade" className="form-control" />
                  <ErrorMessage name="no_entidade" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="qt_mat_bas" className="form-label">Qt. Matrículas</label>
                  <Field type="number" id="qt_mat_bas" name="qt_mat_bas" className="form-control" />
                  <ErrorMessage name="qt_mat_bas" component="div" className="text-danger" />
                </div>

                <Button type="submit" variant="primary">
                  {clienteEditando ? 'Salvar' : 'Adicionar'}
                </Button>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClientesTable;
