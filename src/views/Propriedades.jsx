import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import ClientesTable from '../components/ClientesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';

const Propriedades = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  let [nome, setNome] = useState('');

  const handleChange = (event) => {
    console.log(nome);
    setNome(event.target.value);
  };

  return (
    <>
      <div>Instituições</div>

      <div>
        <Row>
          <Col>
            <MDBInput label="Buscar" id="formControlSm" type="text" size="sm" />
          </Col>
          <Col>
            <MDBTooltip
              tag="span"
              wrapperClass="d-inline-block"
              title="Adicionar Instituições"
            >
              <Button onClick={handleShow}>+</Button>
            </MDBTooltip>
          </Col>
        </Row>
      </div>

      {/* Clientes */}
      <ClientesTable></ClientesTable>

      <Modal
        show={show}
        onHide={handleShow}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Cadastrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                id="nome"
                name="nome"
                value={nome}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>UF</Form.Label>
              <Form.Control type="text" id="uf" name="uf" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cidade</Form.Label>
              <Form.Control type="text" id="cidade" name="cidade" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Macrorregião</Form.Label>
              <Form.Control type="text" id="macrorregiao" name="macrorregiao" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Microrregião</Form.Label>
              <Form.Control type="text" id="microrregiao" name="microrregiao" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Matricula</Form.Label>
              <Form.Control
                type="text"
                placeholder="123456789"
                id="matricula"
                name="matricula"
              />
            </Form.Group>

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleShow}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Propriedades;
