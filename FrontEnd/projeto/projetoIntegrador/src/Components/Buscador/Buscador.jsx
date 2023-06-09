import { DateRangePicker } from 'rsuite';
import { CustomProvider } from 'rsuite';
import pt_BR from "rsuite/locales/pt_BR";
import format from 'date-fns/format';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import endOfMonth from 'date-fns/endOfMonth';
import { pt } from 'date-fns/locale'
import styles from "./Buscador.module.css";
import { useState, useEffect } from 'react';
import { 
  ImLocation
} from 'react-icons/im'
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

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
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      console.log(response.data);
      console.log(dadoFiltrado);
      var cidades = response.data;
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

  const predefinedRanges = [
    {
      label: 'Hoje',
      value: [new Date(), new Date()],
      placement: 'left'
    },
    {
      label: 'Amanhã',
      value: [addDays(new Date(), +1), addDays(new Date(), +1)],
      placement: 'left'
    },
    {
      label: 'Esta semana',
      value: [new Date(), endOfWeek(new Date())],
      placement: 'left'
    },
    {
      label: 'Este mês',
      value: [new Date(), endOfMonth(new Date())],
      placement: 'left'
    }
  ];

  const predefinedRangesBottom = [
    {
      label: 'Hoje',
      value: [new Date(), new Date()],
      placement: 'bottom'
    },
    {
      label: 'Amanhã',
      value: [addDays(new Date(), +1), addDays(new Date(), +1)],
      placement: 'bottom'
    },
    {
      label: 'Esta semana',
      value: [new Date(), endOfWeek(new Date())],
      placement: 'bottom'
    },
    {
      label: 'Este mês',
      value: [new Date(), endOfMonth(new Date())],
      placement: 'bottom'
    }
  ];

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
      <div className="sticky-buscador">
        <div className={styles.buscadorContainer}>
            <h1 className={styles.buscadorTitle}>Buscar acomodações</h1>
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
              <CustomProvider className={styles.buscadorCalendar} locale={pt_BR}>
                {windowWidth <= 756 ? (
                  <DateRangePicker
                    placement='bottomEnd'
                    preventOverflow
                    showOneCalendar
                    shouldDisableDate={(data) => {
                      if(data < addDays(new Date(), -1))
                        return true;
                      else
                        return false;
                    }}
                    size="lg"
                    className={styles.buscadorTxt}
                    ranges={predefinedRangesBottom}
                    placeholder="Escolha suas datas"
                    format="dd-MM-yyyy"
                    locale={{
                    sunday: 'Dom',
                    monday: 'Seg',
                    tuesday: 'Ter',
                    wednesday: 'Qua',
                    thursday: 'Qui',
                    friday: 'Sex',
                    saturday: 'Sab',
                    ok: 'OK',
                    dateLocale: pt
                    }}
                  />
                ) : (
                  <DateRangePicker
                    placement='bottomEnd'
                    preventOverflow
                    shouldDisableDate={(data) => {
                      if(data < addDays(new Date(), -1))
                        return true;
                      else
                        return false;
                    }}
                    size="lg"
                    className={styles.buscadorTxt}
                    ranges={predefinedRanges}
                    placeholder="Escolha suas datas"
                    format="dd-MM-yyyy"
                    locale={{
                    sunday: 'Dom',
                    monday: 'Seg',
                    tuesday: 'Ter',
                    wednesday: 'Qua',
                    thursday: 'Qui',
                    friday: 'Sex',
                    saturday: 'Sab',
                    ok: 'OK',
                    dateLocale: pt
                    }}
                  />
                )}
              </CustomProvider>
              
              <button onClick={getCidades} className={styles.buscadorBtn}>Buscar</button>
            </div>
        </div>
      </div>
  );
};

export default Buscador;