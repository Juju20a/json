import { Container } from 'react-bootstrap';
import PropriedadesCard from './PropriedadesCard';

const Main = () => {
  return (
    <main>
      <Container fluid className="mt-2">
        {/* Propriedades */}
        <PropriedadesCard />
      </Container>
    </main>
  );
};

export default Main;
