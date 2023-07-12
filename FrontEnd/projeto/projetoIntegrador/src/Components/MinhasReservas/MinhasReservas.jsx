import styles from './MinhasReservas.module.css';
import { useContext, useEffect, useState } from "react";
import { ReservaContext } from '../../Contexts/ReservaContext';
import { AuthContext } from '../../Contexts/AuthContext';
import api from "../../Services/api";
import { format, parseISO, isBefore  } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

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
        <div className={styles.reservaContainer}>
            <div className={styles.reservaTitle}>
                <h1>Minhas reservas</h1>
                <p>Total de reservas: {reservas.length}</p>
            </div>
          <div className={styles.cardsContainer}>
            {reservas.map((reserva) => {
                const dataInicial = parseISO(reserva.dataInicial);
                const dataFinal = parseISO(reserva.dataFinal);
                const dataInicialFormatada = format(dataInicial, 'dd/MM/yyyy', { locale: ptBR });
                const dataFinalFormatada = format(dataFinal, 'dd/MM/yyyy', { locale: ptBR });
                const isReservaAtiva = isBefore(dataFinal, new Date());

            return (
                <div key={reserva.id} className={`${styles.cardContainer} ${isReservaAtiva ? styles.inativa : ''}`}>
                    <div className={styles.cardData}>
                        <h3>ID da reserva: {reserva.id}</h3>
                        <img src={reserva.produto.imagemList[0].url} alt={reserva.produto.imagemList[0].titulo} />
                        <h2>{reserva.produto.nome}</h2>

                        <div className={styles.cardEndereco}>
                            <FmdGoodOutlinedIcon/>
                            <div className={styles.enderecoCompleto}>
                                {/*--colocar aqui o endereco rua tal, n 123 */}
                                <p>{reserva.produto.cidade.nome}, {reserva.produto.cidade.pais}</p>
                            </div>
                        </div>
                        
                        <div className={styles.datas}>
                            <div className={styles.innerDatas}>
                                <p>Check-in</p>
                                <p>{dataInicialFormatada}</p>    
                            </div>

                            <div className={styles.divisor}></div>
                            
                            <div className={styles.innerDatas}>
                                <p>Check-out</p>
                                <p>{dataFinalFormatada}</p>
                            </div>
                        </div> 
                    </div>
                </div>
            );
            })}
            </div>

        </ div>
    );

}


export default MinhasReservas;