import CaractProd from "../CaractProd/CaractProd";
import DescProd from "../DescProd/DescProd";
import HeaderProd from "../HeaderProd/HeaderProd";
import ImgProd from "../ImgProd/ImgProd";
import LocalProd from "../LocalProd/LocalProd";
import PoliticaProd from "../PoliticaProd/PoliticaProd";
import ReservaProd from "../ReservaProd/ReservaProd";
import styles from "./Detalhes.module.css";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import { useEffect } from 'react';

const Detalhes = () => {
    const { id } = useParams();
    const { saveId, obterProduto } = useContext(ProdContext);
    

    useEffect(() => {
        saveId(id);
        obterProduto();
    }, []);

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