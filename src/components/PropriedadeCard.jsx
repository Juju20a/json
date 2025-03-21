import { Card, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PropriedadeCard = ({ imagem, nome, descricao }) => {
  const detalharHandleClick = () => {
    console.log(`Clicou em ${nome}`);
  };

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imagem} />
        <Card.Body>
          <Card.Title>{nome}</Card.Title>
          <Card.Text>{descricao}</Card.Text>
          <Button onClick={detalharHandleClick} variant="primary">
            Detalhar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

PropriedadeCard.propTypes = {
  imagem: PropTypes.string,
  nome: PropTypes.string,
  descricao: PropTypes.string,
};

export default PropriedadeCard;
