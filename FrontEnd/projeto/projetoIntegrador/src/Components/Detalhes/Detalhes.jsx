import CaractProd from "../CaractProd/CaractProd";
import DescProd from "../DescProd/DescProd";
import HeaderProd from "../HeaderProd/HeaderProd";
import ImgProd from "../ImgProd/ImgProd";
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

          console.log("Produto", response.data);
    
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
          salvarProduto(prod);
          salvarLoading(false);
    
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
            <div className={styles.detalhesContainer}></div>
        );
    }

    return (
        <div className={styles.detalhesContainer}>
            <HeaderProd tela="produto" />
            <ImgProd />
            <DescProd />
            <CaractProd />
            <ReservaProd />
            <PoliticaProd />
        </div>
    );
};

export default Detalhes;