import styles from './Checkin.module.css';
import { useState } from 'react';
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ReservaContext } from "../../Contexts/ReservaContext";
import { format } from "date-fns";

const Checkin = () => {
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const { horaIni, dataIni, dataFim, setHoraIni, setDataIni, setDataFim, reserva, salvarReserva } = useContext(ReservaContext); 
    const navigate = useNavigate(); 

    const handleCheckinChange = (event) => {
        setCheckinDate(event.target.value);
      };
    
      const handleCheckoutChange = (event) => {
        setCheckoutDate(event.target.value);
    };

    useEffect(() => {
        if(dataIni && dataFim){
            setCheckinDate(format(dataIni, "dd/MM/yyyy"));
            setCheckoutDate(format(dataFim, "dd/MM/yyyy"));
        }

   }, []);

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
                    type="text"
                    id="checkinDate"
                    value={format(dataIni, "dd/MM/yyyy")}
                    onChange={handleCheckinChange}
                />
            </div>
            <div className="divisoria"></div>
            <div className={styles.check}>
                <label className={styles.checkinLabel}>Check-out:</label>
                    <input
                        type="text"
                        id="checkoutDate"
                        value={format(dataFim, "dd/MM/yyyy")}
                        onChange={handleCheckoutChange}
                    />
            </div>
            <div className="divisoria"></div>
            <button className={styles.checkButton} onClick={confirmarReserva}>Confirmar Reserva</button>
        </div>
    )
}

export default Checkin;