import styles from "./TelaReserva.module.css";
import { useContext, useEffect } from "react";
import { ReservaContext } from "../../Contexts/ReservaContext";
import { ProdContext } from "../../Contexts/ProdContext";
import HeaderProd from "../HeaderProd/HeaderProd";
import PoliticaProd from "../PoliticaProd/PoliticaProd";
import FormReserva from "../FormReserva/FormReserva";
import Detalhes from "../Detalhes/Detalhes";
import DatasReserva from "../DatasReserva/DatasReserva";
import api from "../../Services/api";
import LocalReservaProd from "../LocalReservaProd/LocalReservaProd";
import HorarioReserva from "../HorarioReserva/HorarioReserva";
import Address from "../Address/Address";
import Checkin from "../Checkin/Checkin";

const TelaReserva = () => {  
    const { id, produto, salvarProduto, salvarLoading, isLoading } = useContext(ProdContext);
    const { reserva, salvarReserva } = useContext(ReservaContext); 

    async function obterProduto(idAux){
        try {
          const response = await api.get("/produto/findById", { params: { id: idAux } },
          { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }});
    
          const prod = {
              id: response.data.id,
              nome: response.data.nome,
              descricao: response.data.descricao,
              categoria: response.data.categoria,
              cidade: response.data.cidade,
              qualificacao: response.data.qualificacao,
              caracteristicas: response.data.caracteristicaList,
              imagemList: response.data.imagemList,
              titulo: response.data.titulo,
              politicas: response.data.politicas,
              endereco: response.data.endereco
          }
          console.log(prod);
          salvarProduto(prod);
          salvarLoading(false);
    
        } catch (error) {
          console.log(error)
        }
      }

    async function obterReservaPorUsuario(idAux) {
      try {
        const response = await api.get("/reserva/findByUsuario", {params: { id: idAux }},
        { headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }});

        const reserva = {
          dataInicial: response.data.dataInicial,
          dataFinal: response.data.dataFinal,
          produto: {
            id: response.data.id
          },
          usuario: {
            id: response.data.id,
          }
        }
        console.log(reserva);
        salvarReserva(reserva);  
      } catch (error) {
        console.log(error)
      }
    }
    

    useEffect(() => {   
      window.scrollTo(0, 0);

      if(id>=0)
          obterProduto(id);
      else
          salvarLoading(true);
    }, [id]);

    if(isLoading)
    {
        return (
            <div className={styles.telaReservaContainer}>

            </div>
        );
    }

    return(
        <div className={styles.telaReservaContainer}>
          
          <HeaderProd tela="reserva" />

          <div className={styles.reservaBody}>
            <div className={styles.telaReservaContainerEsq}>
              <FormReserva />
              <div className={styles.divisor}></div>
              <DatasReserva />
              <div className={styles.divisor}></div>
              <HorarioReserva />
            </div>

            <div className={styles.telaReservaContainerDir}>
              <div className={styles.telaReservaDir}>
                <h1>Detalhe da reserva</h1>
                <LocalReservaProd />
                <Address />
                <Checkin />
              </div>
            </div>
          </div>

          <PoliticaProd />

        </div>
    )
};

export default TelaReserva;