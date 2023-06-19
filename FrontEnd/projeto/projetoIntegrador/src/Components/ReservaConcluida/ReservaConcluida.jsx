import styles from './ReservaConcluida.module.css';
import vetor from "../../Data/Vector.png";
import { useNavigate } from "react-router-dom";


const ReservaConcluida = () => {
    const navigate = useNavigate();
    
    const handleVoltarInicio = () => {
        navigate('/');
    };

    return(
        <div className={styles.reservaConcluidaContainer}>
            <div className={styles.reservaCentralizar}>
                <div className={styles.reserva}>
                    <img className={styles.vetor} src={vetor}></img>
                    <h1 className={styles.reservaConcluidaTxt}>Muito obrigado!</h1>
                    <h3 className={styles.reservaTxt}>Sua reserva foi realizada com sucesso</h3>
                    <button className={styles.reservaConcluidaBtn} onClick={handleVoltarInicio}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default ReservaConcluida;