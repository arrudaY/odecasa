import { DateRangePicker } from 'rsuite';
import styles from "./Buscador.module.css";
import { useState, useEffect } from 'react';
import { 
  ImLocation
} from 'react-icons/im'
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

// const data = [
//   {cidade: "Sao Paulo", estado: "Sao Paulo"},
//   {cidade:"Florianopolis", estado: "Santa Catarina"} ,
//   {cidade:"Rio de Janeiro", estado: "Rio de Janeiro"}, 
//   {cidade: "Belo Horizonte", estado: "Minas Gerais"}, 
// ]


const Buscador = () => {
  const [termoBusca, setTermoBusca] = useState('');
  const [dadoFiltrado, setDadoFiltrado] = useState([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState([]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const termoBuscaLower = termoBusca.toLowerCase();
    const resultadoFiltrado = filtrarDados(termoBuscaLower);
    setDadoFiltrado(resultadoFiltrado);
  }, [termoBusca]);

  const filtrarDados = (termoBuscaLower) => {
    return data.filter((item) =>
      item.cidade.toLowerCase().includes(termoBuscaLower) ||
      item.estado.toLowerCase().includes(termoBuscaLower)
    );
  };

  const handleInputChange = ({ target: { value } }) => {
    const termoBuscaLower = value.toLowerCase();
    const resultadoFiltrado = filtrarDados(termoBuscaLower);

    setTermoBusca(value);
    setDadoFiltrado(resultadoFiltrado);
    setMostrarResultado(!!value && resultadoFiltrado.length > 0);
  };

  const selecionarItem = (item) => {
    setTermoBusca(item);
    setMostrarResultado(false);
    setDadoFiltrado([]);
  };

  async function getCidades(){
    try {
      const response = await api.get("/cidade",
      { headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }});
      console.log("response", response.data);
      const cidades = response.data.map((cidade) => ({
        nome: cidade.nome,
        pais: cidade.pais,
      }));
      setData(cidades);
      //console.log("cidades", cidades);
      console.log("data filtrado", dadoFiltrado);
      for(var i = 0; i < cidades.length; i++){
        if(cidades[i].nome.toLowerCase().slice(0, dadoFiltrado[0].cidade.length) === dadoFiltrado[0].cidade.toLowerCase()){
          navigate(`/cidade/${cidades[i].id}`);
          break;
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className="sticky-buscador">
        <div className={styles.buscadorContainer}>
            <h1 className={styles.buscadorTitle}>Buscar acomodações</h1>
            <div className={styles.buscadorInputs}>
              <input className={styles.buscadorTxt} type="text" placeholder=" Local" onChange={handleInputChange} value={termoBusca} />
              {mostrarResultado && (
                <ul className={styles.filter}>
                  {dadoFiltrado.map((item) => (
                    <li key={item.nome} onClick={() => selecionarItem(item.nome)}>
                      <p className={styles.nome}><ImLocation /> {item.nome}</p>
                      <p className={styles.pais}>{item.estado}</p>
                    </li>
                  ))}
                </ul>
              )}
              <DateRangePicker size="lg" placeholder="Checkin ~ Checkout" format={"dd-MM-yyyy"} className={styles.buscadorTxt}/>
              <button onClick={getCidades} className={styles.buscadorBtn}>Buscar</button>
            </div>
        </div>
      </div>
  );
};

export default Buscador;