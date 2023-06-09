import styles from "./ReservaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import DateRangeSelector from "../DateRangeSelector/DateRangeSelector";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
//import jwt_decode from "jwt-decode";

const ReservaProd = () => {    
    const { id, produto } = useContext(ProdContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate(); 

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    function verificarUsuarioLogado(){   
        const token = localStorage.getItem("token");
    
        if (!token) {
            console.log(token, "Usuário nao possui token")
            //Incluir mensagem que o usuário precisa estar logado para concluir a reserva
            navigate("/login");
        } else {
            //terminar validação
            try {
            navigate("/reserva");
            } catch (error) {
            console.log("Erro" + error.message);
            }
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
            <div className="divisoria"></div>
            <div className={styles.reservaReserva}>
                {windowWidth <= 676 ? (<DateRangeSelector direction="vertical" className={styles.reservaCalendarios}/>) :
                (<DateRangeSelector direction="horizontal" className={styles.reservaCalendarios}/>)}
                <button className={styles.reservaBtn} onClick={verificarUsuarioLogado}>Fazer Reserva</button>
            </div>
        </div>
    );
};

export default ReservaProd;