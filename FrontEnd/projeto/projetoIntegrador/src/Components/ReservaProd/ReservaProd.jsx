import styles from "./ReservaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import DateRangeSelector from "../DateRangeSelector/DateRangeSelector";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Contexts/AuthContext";
import { ReservaContext } from "../../Contexts/ReservaContext";

const ReservaProd = () => {    
  const { id, produto } = useContext(ProdContext);
  const { stsLogin } = useContext(AuthContext); 
  const { mudarMsgLogin } = useContext(ReservaContext); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate(); 

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  function verificarUsuarioLogado(){   
    if (stsLogin === "Login") {
      console.log("Usuario precisa fazer Login")
      mudarMsgLogin(true);
      navigate("/login");
    } else {
      mudarMsgLogin(false);
      //terminar validação
      navigate("/detalhes/" + id + "/reserva");
    };
  };

  function handleSelect(ranges){
      console.log(ranges);
      // {
      //   selection: {
      //     startDate: [native Date Object],
      //     endDate: [native Date Object],
      //   }
      // }
    };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.reservaContainer}>

      <h2>Escolha as suas datas</h2>

      <div className={styles.divisor}></div>

      <div className={styles.innerContainer}>

        <div className={styles.reservaReserva}>
          {windowWidth <= 760
          ? (<DateRangeSelector direction="vertical" className={styles.reservaCalendarios}/>)
          : (<DateRangeSelector direction="horizontal" className={styles.reservaCalendarios}/>)}
        </div>

        <div className={styles.reservaConfirm}>
          <p>Adicione suas datas de viagem para obter preços precisos.</p>
          <button className={styles.reservaBtn} onClick={verificarUsuarioLogado}>Fazer reserva</button>
        </div>
        
      </div>
    </div>
  );
};

export default ReservaProd;