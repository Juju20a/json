import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import clientes from '../datasets/clientes';

const ClientesTable = () => {
  let clientesData = [...clientes];
  return (
    <>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">UF</th>
            <th scope="col">Cidade</th>
            <th scope="col">Macrorregião</th>
            <th scope="col">Microrregião</th>
            <th scope="col">Maticula</th>
            <th scope="col">Opção</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {clientesData.map((cliente, i) => {
            return (
              <tr key={i}>
                <td>{cliente.nome}</td>
                <td>{cliente.uf}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.macrorregiao}</td>
                <td>{cliente.microrregiao}</td>
                <td>{cliente.matricula}</td>
                <td>
                  <MDBBtn floating tag="a" className="mx-2">
                    <MDBIcon fas icon="pen" />
                  </MDBBtn>

                  <MDBBtn floating tag="a" className="mx-2" color="danger">
                    <MDBIcon fas icon="trash-alt" />
                  </MDBBtn>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default ClientesTable;
