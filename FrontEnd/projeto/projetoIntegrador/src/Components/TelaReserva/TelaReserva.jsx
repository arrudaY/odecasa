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
import ImgProd from "../ImgProd/ImgProd";
import LocalProd from "../LocalProd/LocalProd";
import HorarioReserva from "../HorarioReserva/HorarioReserva";

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
              politicas: {
                checkin: "14:00",
                checkout: "12:00",
                regras: ["Não fumar", "Não é permitido festas"],
                saudeSeg: ["Diretrizes de distanciamento social e outras regulamentações relacionadas ao coronavírus se aplicam",
                           "Detector de fumaça", "Câmeras de vigilância externa"],
                cancelamento: ["O cancelamento é reembolsável até dois dias antes do início da reserva"]
              }
          }
          console.log(prod);
          salvarProduto(prod);
          salvarLoading(false);
    
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {   
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
            <HeaderProd />
            <div className={styles.telaReservaContainerEsq}>
                <FormReserva />
                <DatasReserva />
                <HorarioReserva />
            </div>
            <div className={styles.telaReservaContainerDir}>
              <h1>Detalhe da Reserva</h1>
              <LocalProd/>
            </div>
            {/* Detalhe da Reserva
            Selecione a Data da Reserva
            Horário de Chegada */}
            <PoliticaProd />
        </div>
    )
};

export default TelaReserva;