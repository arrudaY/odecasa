import Footer from "./Components/Footer/Footer"
import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Cadastro from "./Routes/Cadastro";
import Login from "./Routes/Login";
import DetalhesProd from "./Routes/DetalhesProd";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ProdProvider from "./Contexts/ProdContext";
import Categoria from "./Routes/Categoria";
import Cidade from "./Routes/Cidade";

function App() {

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ProdProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/detalhes/:id" element={<DetalhesProd />} />
              <Route path="/categoria/:id" element={<Categoria />} />
              <Route path="/cidade/:id" element={<Cidade />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </BrowserRouter>
      </ProdProvider>
      </LocalizationProvider>
    </div>
  )
}

export default App
