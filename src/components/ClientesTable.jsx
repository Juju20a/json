import React, { useState } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clientes from '../datasets/clientes';
import { Modal } from 'react-bootstrap'; 
import { toast, ToastContainer } from 'react-toastify'; s
import 'react-toastify/dist/ReactToastify.css'; 

const validationSchema = Yup.object({
  nome: Yup.string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .required('O nome é obrigatório'),
  instituicao: Yup.string()
    .min(2, 'A instituição deve ter pelo menos 2 caracteres')
    .required('A instituição é obrigatória'),
  matricula: Yup.string()
    .matches(/^\d{6}$/, 'Matrícula inválida, deve ter 6 dígitos')
    .required('A matrícula é obrigatória'),
  uf: Yup.string()
    .length(2, 'UF deve ter exatamente 2 caracteres')
    .required('A UF é obrigatória'),
  cidade: Yup.string()
    .required('A cidade é obrigatória'),
  macrorregiao: Yup.string()
    .required('A macrorregião é obrigatória'),
  microrregiao: Yup.string()
    .required('A microrregião é obrigatória'),
});

const ClientesTable = () => {
  const [clientesData, setClientesData] = useState([...clientes]);
  const [clienteEditando, setClienteEditando] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  
  const handleEditarCliente = (cliente) => {
    setClienteEditando(cliente);
    setShowModal(true);
  };

  
  const handleExcluirCliente = (id) => {
    setClientesData(clientesData.filter(cliente => cliente.id !== id)); 
    toast.success("Cliente excluído com sucesso!");
  };

 
  const handleSalvarCliente = (values) => {
    if (clienteEditando) {
     
      setClientesData(clientesData.map(cliente =>
        cliente.id === clienteEditando.id ? { ...cliente, ...values } : cliente
      ));
      toast.success("Cliente editado com sucesso!"); 
    } else {
      // Adicionar novo cliente
      const novoCliente = { id: Date.now(), ...values }; 
      setClientesData([...clientesData, novoCliente]);
      toast.success("Cliente adicionado com sucesso!"); 
    }
    setShowModal(false); /
    setClienteEditando(null); 
  };

  return (
    <>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Instituição</th>
            <th scope="col">Matrícula</th>
            <th scope="col">UF</th>
            <th scope="col">Cidade</th>
            <th scope="col">Macrorregião</th>
            <th scope="col">Microrregião</th>
            <th scope="col">Opções</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {clientesData.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.instituicao}</td>
              <td>{cliente.matricula}</td>
              <td>{cliente.uf}</td>
              <td>{cliente.cidade}</td>
              <td>{cliente.macrorregiao}</td>
              <td>{cliente.microrregiao}</td>
              <td>
                <MDBBtn floating tag="a" className="mx-2" onClick={() => handleEditarCliente(cliente)}>
                  <MDBIcon fas icon="pen" />
                </MDBBtn>

                <MDBBtn floating tag="a" className="mx-2" color="danger" onClick={() => handleExcluirCliente(cliente.id)}>
                  <MDBIcon fas icon="trash-alt" />
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{clienteEditando ? 'Editar Cliente' : 'Adicionar Cliente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              nome: clienteEditando ? clienteEditando.nome : '',
              instituicao: clienteEditando ? clienteEditando.instituicao : '',
              matricula: clienteEditando ? clienteEditando.matricula : '',
              uf: clienteEditando ? clienteEditando.uf : '',
              cidade: clienteEditando ? clienteEditando.cidade : '',
              macrorregiao: clienteEditando ? clienteEditando.macrorregiao : '',
              microrregiao: clienteEditando ? clienteEditando.microrregiao : '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSalvarCliente}
          >
            <Form>
              <div>
                <label htmlFor="nome">Nome</label>
                <Field type="text" id="nome" name="nome" />
                <ErrorMessage name="nome" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor="instituicao">Instituição</label>
                <Field type="text" id="instituicao" name="instituicao" />
                <ErrorMessage name="instituicao" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor="matricula">Matrícula</label>
                <Field type="text" id="matricula" name="matricula" />
                <ErrorMessage name="matricula" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor="uf">UF</label>
                <Field type="text" id="uf" name="uf" />
                <ErrorMessage name="uf" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor="cidade">Cidade</label>
                <Field type="text" id="cidade" name="cidade" />
                <ErrorMessage name="cidade" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor="macrorregiao">Macrorregião</label>
                <Field type="text" id="macrorregiao" name="macrorregiao" />
                <ErrorMessage name="macrorregiao" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor="microrregiao">Microrregião</label>
                <Field type="text" id="microrregiao" name="microrregiao" />
                <ErrorMessage name="microrregiao" component="div" style={{ color: 'red' }} />
              </div>

              <MDBBtn type="submit" className="mt-3">
                {clienteEditando ? 'Salvar' : 'Adicionar'}
              </MDBBtn>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Toast Container for success messages */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeButton />
    </>
  );
};

export default ClientesTable;
