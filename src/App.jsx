import Home from './views/Home';
import Propriedades from './views/Propriedades';
import Sobre from './views/Sobre';
import { Route, Routes } from 'react-router-dom';
import Principal from './layouts/Principal';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Principal />}>
        <Route index element={<Home />} />
        <Route path="propriedades" element={<Propriedades />} />
        <Route path="sobre" element={<Sobre />} />
      </Route>
    </Routes>
  );
}

export default App;
