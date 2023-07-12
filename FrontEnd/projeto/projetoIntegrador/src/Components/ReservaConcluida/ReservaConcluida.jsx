import styles from './ReservaConcluida.module.css';
import { useNavigate } from "react-router-dom";
import VerifiedIcon from '@mui/icons-material/Verified';

const ReservaConcluida = () => {
    const navigate = useNavigate();
    
    const handleVoltarInicio = () => {
        navigate('/');
    };

    return(
        <div className={styles.reservaConcluidaContainer}>
            <div className={styles.reservaCentralizar}>
                <div className={styles.reserva}>
                    <div className={styles.icon}>
                        <VerifiedIcon sx={{ fontSize:"72px", color:"#5581FB" }}/>
                    </div>
                    <h1>Muito obrigado!</h1>
                    <p>Sua reserva foi realizada com sucesso</p>
                    <button onClick={handleVoltarInicio}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default ReservaConcluida;