import { Container, Carousel } from 'react-bootstrap';
import PropriedadesCard from './PropriedadesCard';

const Main = () => {
  return (
    <main>
      <Container fluid className="mt-2">
        {/* Carrossel de Imagens */}
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Slide+1"
              alt="Primeiro slide"
            />
            <Carousel.Caption>
              <h3>Bem-vindo ao Educa Brasil</h3>
              <p>Gerencie suas instituições de ensino com facilidade.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Slide+2"
              alt="Segundo slide"
            />
            <Carousel.Caption>
              <h3>Explore Nossos Recursos</h3>
              <p>Veja relatórios detalhados e cadastre novas instituições.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Propriedades (Cartões) */}
        <PropriedadesCard />
      </Container>
    </main>
  );
};

export default Main;
