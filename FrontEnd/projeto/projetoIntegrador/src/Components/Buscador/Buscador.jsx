import { DateRangePicker } from 'rsuite';
import styles from "./Buscador.module.css";
import { useState, useEffect } from 'react';
import { 
  ImLocation
} from 'react-icons/im'

const data = [
  {cidade: "Sao Paulo", estado: "Sao Paulo"},
  {cidade:"Florianopolis", estado: "Santa Catarina"} ,
  {cidade:"Rio de Janeiro", estado: "Rio de Janeiro"}, 
  {cidade: "Belo Horizonte", estado: "Minas Gerais"}, 
]


const Buscador = () => {
  const [termoBusca, setTermoBusca] = useState('');
  const [dadoFiltrado, setDadoFiltrado] = useState([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);

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

  return (
      <div className="sticky-buscador">
        <div className={styles.buscadorContainer}>
            <h1>Buscar acomodações</h1>
            <div className={styles.buscadorInputs}>
              <input className={styles.buscadorTxt} type="text" placeholder=" Local" onChange={handleInputChange} value={termoBusca} />
              {mostrarResultado && (
                <ul className={styles.filter}>
                  {dadoFiltrado.map((item) => (
                    <li key={item.cidade} onClick={() => selecionarItem(item.cidade)}>
                      <p className={styles.cidade}><ImLocation /> {item.cidade}</p>
                      <p className={styles.estado}>{item.estado}</p>
                    </li>
                  ))}
                </ul>
              )}
              <DateRangePicker size="lg" placeholder="Checkin ~ Checkout" format={"dd-MM-yyyy"} className={styles.buscadorTxt}/>
              <button className={styles.buscadorBtn}>Buscar</button>
            </div>
        </div>
      </div>
  );
};

export default Buscador;