import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import UserFormInsertPage from './pages/UserFormInsertPage';
import Coches from './pages/Coches';
import Ingles from './pages/Ingles';
import ResultadosIngles from './pages/ResultadosIngles';


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
      </Routes>
    </BrowserRouter>
  );
}

export default App;





