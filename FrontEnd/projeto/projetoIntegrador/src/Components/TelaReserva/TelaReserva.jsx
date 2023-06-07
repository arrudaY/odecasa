import styles from "./TelaReserva.module.css";
import { useContext, useEffect } from "react";
import { ReservaContext } from "../../Contexts/ReservaContext";
import { ProdContext } from "../../Contexts/ProdContext";
import HeaderProd from "../HeaderProd/HeaderProd";
import PoliticaProd from "../PoliticaProd/PoliticaProd";
import FormReserva from "../FormReserva/FormReserva";
import Detalhes from "../Detalhes/Detalhes";

const TelaReserva = () => {  
    const { id, produto } = useContext(ProdContext);

    return(
        <div className={styles.telaReservaContainer}>
            {/* <HeaderProd /> */}
            <FormReserva />
            {/* Detalhe da Reserva
            Selecione a Data da Reserva
            Horário de Chegada */}
            {/* <PoliticaProd /> */}
        </div>
    )
};

export default TelaReserva;