import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import UserFormInsertPage from './pages/UserFormInsertPage';
import Coches from './pages/Coches';
import Ingles from './pages/Ingles';
import ResultadosIngles from './pages/ResultadosIngles';
/* import Motivaciones from './pages/Motivaciones'; */
import ShoppingCartComponent from './components/ShoppingCartComponent';
import ShoppingCartComponent2 from './components/ShoppingCartComponent2';
import Faq from './pages/Faq';
import Login from './pages/Login';
import CatBouncePage from './pages/CatBouncePage';  
import ValoraMVC from './pages/ValoraMVC';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/:id/edit" element={<UserFormInsertPage />} />  {/* No implementado */}
        <Route path="/users/new" element={<UserFormInsertPage />} />
        <Route path="/coches" element={<Coches />} />
        <Route path="/ingles" element={<Ingles />} />
        <Route path="/resultadosingles" element={<ResultadosIngles />} />
        {/* <Route path="/motivaciones" element={<Motivaciones />} /> */}
        <Route path="/shoppingcartcomponent" element={<ShoppingCartComponent />} />
        <Route path="/shoppingcartcomponent2" element={<ShoppingCartComponent2 />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catbouncepage" element={<CatBouncePage />} />
        <Route path="/valoramvc" element={<ValoraMVC />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





