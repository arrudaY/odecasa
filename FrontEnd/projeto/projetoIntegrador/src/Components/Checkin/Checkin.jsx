import styles from './Checkin.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkin = () => {
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const navigate = useNavigate(); 

    const handleCheckinChange = (event) => {
        setCheckinDate(event.target.value);
      };
    
      const handleCheckoutChange = (event) => {
        setCheckoutDate(event.target.value);
    };

    function confirmarReserva() {
        const isDataValida = checkinDate && checkoutDate;

        if (isDataValida) {
            navigate("/reserva-concluida");
        } else {
            console.log('Dados inválidos!');
        }
    }

    return(
        <div className={styles.checkinContainer}>
            <div className="divisoria"></div>
            <div className={styles.check}>
                <label className={styles.checkinLabel}>Check-in:</label>
                <input
                    type="date"
                    id="checkinDate"
                    value={checkinDate}
                    onChange={handleCheckinChange}
                />
            </div>
            <div className="divisoria"></div>
            <div className={styles.check}>
                <label className={styles.checkinLabel}>Check-out:</label>
                    <input
                        type="date"
                        id="checkoutDate"
                        value={checkoutDate}
                        onChange={handleCheckoutChange}
                    />
            </div>
            <div className="divisoria"></div>
            <button className={styles.checkButton} onClick={confirmarReserva}>Confirmar Reserva</button>
        </div>
    )
}

export default Checkin;