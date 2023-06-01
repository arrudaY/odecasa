import CaractProd from "../CaractProd/CaractProd";
import DescProd from "../DescProd/DescProd";
import HeaderProd from "../HeaderProd/HeaderProd";
import ImgProd from "../ImgProd/ImgProd";
import LocalProd from "../LocalProd/LocalProd";
import PoliticaProd from "../PoliticaProd/PoliticaProd";
import ReservaProd from "../ReservaProd/ReservaProd";
import styles from "./Detalhes.module.css";
import { useContext, useEffect } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import api from "../../Services/api";

const Detalhes = () => {
    const { id, salvarProduto, salvarLoading, isLoading } = useContext(ProdContext);

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
            <div className={styles.detalhesContainer}>

            </div>
        );
    }

    return (
        <div className={styles.detalhesContainer}>
            <HeaderProd />
            <LocalProd />
            <ImgProd />
            <DescProd />
            <CaractProd />
            <ReservaProd />
            <PoliticaProd />
        </div>
    );
};

export default Detalhes;