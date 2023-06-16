import styles from './Checkin.module.css';
import { useState } from 'react';
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ReservaContext } from "../../Contexts/ReservaContext";
import { format } from "date-fns";
import api from "../../Services/api";
import { ProdContext } from "../../Contexts/ProdContext";
import { AuthContext } from "../../Contexts/AuthContext";

const Checkin = () => {
    const { id } = useContext(ProdContext);
    const { idUsuario } = useContext(AuthContext); 
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

    async function postReserva(){
        const token = localStorage.getItem("ctd_token");
        if(token != null){
            try{
                const response = await api.post("/reserva", {
                    dataInicial: format(dataIni, "yyyy-MM-dd") + "T" + horaIni,
                    dataFinal: format(dataFim, "yyyy-MM-dd") + "T23:59:59",
                    produto:{
                        id: id
                    },
                    usuario:{
                        id: idUsuario
                    }
                }, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  }});
                console.log(response.data);
                navigate("/reserva-concluida");
            } catch (error) {
                console.log(error);
                alert("Erro ao tentar fazer nova reserva");
            }
        }
    }

    useEffect(() => {
        if(dataIni && dataFim){
            setCheckinDate(format(dataIni, "dd/MM/yyyy"));
            setCheckoutDate(format(dataFim, "dd/MM/yyyy"));
        }

   }, []);

    function confirmarReserva() {
        const isDataValida = checkinDate && checkoutDate && horaIni;

        console.log("Data Ini: " + format(dataIni, "yyyy-MM-dd") + "T" + horaIni + ", Data Fim: " + format(dataFim, "yyyy-MM-dd") + "T23:59:59");

        if (isDataValida)
            postReserva();
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