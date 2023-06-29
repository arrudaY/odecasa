import styles from './MinhasReservas.module.css';
import { useContext, useEffect, useState } from "react";
import { ReservaContext } from '../../Contexts/ReservaContext';
import { AuthContext } from '../../Contexts/AuthContext';
import api from "../../Services/api";

const MinhasReservas = () => {
    const { reserva} = useContext(ReservaContext)
    const { idUsuario} = useContext(AuthContext);
    const [reservas, setReservas] = useState([]);

    async function obterUsuarioReserva(idUsuario) {
        const token = localStorage.getItem("ctd_token");
        try {
            const response = await api.get(`/reserva/findByUsuario?id=${idUsuario}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              });
              const reservas = response.data
              setReservas(reservas); 
              console.log("reservas aqui", reservas)
        } catch(err){
            console.log(err)
        }
      } 

    useEffect(() => {
        obterUsuarioReserva(idUsuario)
    }, [reserva, idUsuario])

    return (
        <>
          <div className={styles.reservaContainer}>
            <div className={styles.reservaTitle}>
                <h1>Minhas reservas</h1>
                <h4>Total de reservas: {reservas.length}</h4>
            </div>
            <div className={styles.cardsContainer}>
                {reservas.map((reserva) => (
                    <div key={reserva.id} className={styles.cardContainer}>
                        <div className={styles.cardData}>
                            <p>ID da reserva: {reserva.id}</p>
                            <h5>Data de entrada: {reserva.dataInicial}</h5>
                            <h5>Data de saída: {reserva.dataFinal}</h5>
                            <h3>{reserva.produto.nome}</h3>
                            <h6>{reserva.produto.cidade.nome}</h6>
                            <img className={styles.cardImage} src={reserva.produto.imagemList[0].url} />
                        </div> 
                    </div> 
                ))}
            </div>
          </div>
        </>
    );

}


export default MinhasReservas;