import styles from "./ReservaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import { DateRangePicker } from "rsuite";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
//import jwt_decode from "jwt-decode";

const ReservaProd = () => {    
    const { id, produto } = useContext(ProdContext);
    const navigate = useNavigate(); 

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
  

    return (
        <div className={styles.reservaContainer}>            
            <h2>Escolha as suas datas</h2>
            <div className="divisoria"></div>
            <div className={styles.reservaReserva}>
                <DateRangePicker size="lg" placeholder="Checkin ~ Checkout" format={"dd-MM-yyyy"} className={styles.reservaTxt} />
                <button className={styles.reservaBtn} onClick={verificarUsuarioLogado}>Fazer Reserva</button>
            </div>
        </div>
    );
};

export default ReservaProd;