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
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const Buscador = () => {
  const { setProdutosBusca } = useContext(ProdContext);

  const [termoBusca, setTermoBusca] = useState('');
  const [dadoFiltrado, setDadoFiltrado] = useState([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cidades, setCidades] = useState([]);
  const [cidade, setCidade] = useState({});
  const [datas, setDatas] = useState([]);
  const [pressOk, setPressOk] = useState(false);
  const [valueCidade, setValueCidade] = useState("");

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const termoBuscaLower = termoBusca.toLowerCase();
    const resultadoFiltrado = filtrarDados(termoBuscaLower);
    setDadoFiltrado(resultadoFiltrado);
  }, [termoBusca]);

  useEffect(() => {
    getCidades();
  }, [])

  const filtrarDados = (termoBuscaLower) => {
    return cidades.filter((item) =>
      item.nome.toLowerCase().includes(termoBuscaLower) ||
      item.pais.toLowerCase().includes(termoBuscaLower)
    );
  };

  const handleInputChange = ({ target: { value } }) => {
    const termoBuscaLower = value.toLowerCase();
    const resultadoFiltrado = filtrarDados(termoBuscaLower);

    setTermoBusca(value);
    setDadoFiltrado(resultadoFiltrado);
    setMostrarResultado(!!value && resultadoFiltrado.length > 0);
    setValueCidade(value);
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
      setCidades(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  async function getProdutos(idCidade){
    try {
      const response = await api.post("/produto/findByCidadePeriodo", {
        cidadeId: idCidade,
        dataInicio: datas[0],
        dataFim: datas[1]
    },{ headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }});
      console.log("Teste do filtro", response.data);
      const produtos = response.data;
      if(produtos.length > 0)
      {
        setProdutosBusca(response.data);
        navigate(`/cidade/${idCidade}`);
      }
      else
      {
        alert("Não encontramos acomodações com os dados de busca informados");
      }
    } catch (error) {
      alert("Não encontramos acomodações com os dados de busca informados");
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

  function buscar(){
    if((valueCidade.length > 0) && pressOk)
    {
      for(var i = 0; i < cidades.length; i++){
        if(cidades[i].nome.toLowerCase().slice(0, valueCidade.length) === valueCidade.toLowerCase()){
          setCidade(cidades[i]);
          console.log("Cidade ", cidades[i]);
          getProdutos(cidades[i].id);
          break;
        }
      }
    }
    else if (!(valueCidade.length > 0))
    {
      alert("Escolha uma cidade para a busca!");
    }
    else if(!pressOk)
    {
      alert("Escolha suas datas para a busca!");
    }
  }

  const pegarData = dates => {
    console.log(dates);
    setDatas([
      format(dates[0], "yyyy-MM-dd") + "T00:00:00",
      format(dates[1], "yyyy-MM-dd") + "T23:59:59"
    ])
    setPressOk(true);
  };

  return (
      <div >
        <div className={styles.buscadorContainer}>

            <h1 className={styles.buscadorTitle}>Buscar acomodações</h1>
            
            <div className={styles.buscadorInputs}>
              <div className={styles.buscadorLocal}>
                <input
                className={styles.buscadorTxt}
                type="text"
                placeholder="Local"
                onChange={handleInputChange}
                value={termoBusca}
                />
                  {mostrarResultado && (
                    <ul className={styles.filter}>
                      {dadoFiltrado.map((item) => (
                        <li key={item.id} onClick={() => selecionarItem(item.nome)}>
                          <FmdGoodOutlinedIcon/>
                          <div className={styles.localInfo}>
                            <p className={styles.nome}>{item.nome}</p>
                            <p className={styles.pais}>{item.pais}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                )}
                <span className={styles.pinIcon}><FmdGoodOutlinedIcon sx={{ fontSize: 18 }}/></span>
              </div>
              
              
              <CustomProvider className={styles.buscadorCalendar} locale={pt_BR}>
                {windowWidth <= 756 ? (
                  <DateRangePicker
                    onOk={pegarData}
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
                    onOk={pegarData}
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
              
              <button onClick={buscar} className={styles.buscadorBtn}>
                <SearchOutlinedIcon sx={{ fontSize: 18 }}/>
                Pesquisar
              </button>

            </div>
        </div>
      </div>
  );
};

export default Buscador;