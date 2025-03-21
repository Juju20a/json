import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start text-muted mt-auto">
      <section>
        <Container className="text-center text-md-start mt-5">
          <div className="row mt-3 pt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-book me-3"></i>Educa Brasil
              </h6>
              <p>
                Instrui o menino no caminho em que deve andar, e, até quando envelhecer, não se desviará dele.
                Provérbios 26:6
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
              <p>
                <i className="fas fa-home me-2"></i>Brasil, BR
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i>+ 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i>+ 01 234 567 89
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2025 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
    </footer>
  );
};

export default Footer;
