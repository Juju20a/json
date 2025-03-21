import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import PropriedadeCard from './PropriedadeCard';
import axios from 'axios';
import { toast } from 'react-toastify';

const PropriedadesCard = () => {
  const [propriedadesData, setPropriedadesData] = useState([]);

  useEffect(() => {
    const fetchPropriedades = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clientes');
        const mappedData = response.data.map(cliente => ({
          imagem: 'https://via.placeholder.com/150',
          nome: cliente.no_entidade,
          descricao: `Localizada em ${cliente.no_municipio}, ${cliente.sg_uf}. Matrículas: ${cliente.qt_mat_bas}`,
        }));
        setPropriedadesData(mappedData);
      } catch (error) {
        toast.error('Erro ao carregar as propriedades.');
        console.error(error);
      }
    };

    fetchPropriedades();
  }, []);

  return (
    <Row xs={1} md={3} className="g-4 mt-3">
      {propriedadesData.map((propriedade, indice) => (
        <PropriedadeCard
          key={indice}
          imagem={propriedade.imagem}
          nome={propriedade.nome}
          descricao={propriedade.descricao}
        />
      ))}
    </Row>
  );
};

export default PropriedadesCard;
