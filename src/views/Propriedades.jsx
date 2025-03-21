import { useState, useContext } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ClientesTable from '../components/ClientesTable';
import { toast } from 'react-toastify';
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

const Propriedades = () => {
  const { setClientes } = useContext(IEContext);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const handleAddCliente = async (values, { resetForm }) => {
    try {
      const response = await axios.post('http://localhost:3000/clientes', values);
      setClientes(prev => [...prev, response.data]);
      toast.success('Instituição adicionada com sucesso!');
      setShow(false);
      resetForm();
    } catch (error) {
      toast.error('Erro ao adicionar instituição.');
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Instituições de Ensino</h2>

        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="Buscar" size="sm" />
          </Col>
          <Col xs="auto">
            <Button onClick={handleShow}>+ Adicionar Instituição</Button>
          </Col>
        </Row>

        <ClientesTable />
      </div>

      <Modal
        show={show}
        onHide={handleShow}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Cadastrar Instituição</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              no_municipio: '',
              sg_uf: '',
              no_mesorregiao: '',
              no_microrregiao: '',
              no_entidade: '',
              qt_mat_bas: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddCliente}
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

                <Button type="submit" variant="primary">Adicionar</Button>
              </form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Propriedades;
