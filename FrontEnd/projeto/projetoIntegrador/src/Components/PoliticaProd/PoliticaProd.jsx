import styles from "./PoliticaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';

const PoliticaProd = () => {    
    const { id, produto } = useContext(ProdContext);

    function buscaCheckin(){
        let fim = produto.politicas.normasDaCasa.indexOf(";");
        return produto.politicas.normasDaCasa.slice(fim - 5, fim);
    }

    function buscaCheckout(){
        let fim = produto.politicas.normasDaCasa.indexOf(";");
        let aux = produto.politicas.normasDaCasa.slice(fim + 1);
        let fim2 = aux.indexOf(";");
        return aux.slice(fim2 - 5, fim2);
    }

    function buscaRegras(){
        let fim = produto.politicas.normasDaCasa.indexOf(";");
        let aux = produto.politicas.normasDaCasa.slice(fim + 1);
        let fim2 = aux.indexOf(";");
        let aux2 = aux.slice(fim2 + 1);
        return aux2;
    }

    return (
        <div className={styles.politicaContainer}>

            <h2>O que você precisa saber</h2>

            <div className={styles.divisor}></div>

            <div className={styles.politicaPoliticas}>
                <div className={styles.politicaRegras}>
                    <ListAltOutlinedIcon fontSize="large" sx={{ color: "black" }}/>
                    <h3>Regras da Casa</h3>
                    <p>Checkin: {buscaCheckin()}</p>
                    <p>CheckOut: {buscaCheckout()}</p>
                    <p>Outras regras: {buscaRegras()}</p>
                </div>

                <div className={styles.politicaSaudeSeg}>
                    <HealthAndSafetyOutlinedIcon fontSize="large" sx={{ color: "black" }}/>
                    <h3>Saúde e Segurança</h3>
                    <p>{produto.politicas.saudeESeguranca}</p>
                </div>

                <div className={styles.politicaCancelamento}>
                    <EventBusyOutlinedIcon fontSize="large" sx={{ color: "black" }}/>
                    <h3>Política de Cancelamento</h3>
                    <p>{produto.politicas.politicasDeCancelamento}</p>
                </div>
                
            </div>
        </div>
    );
};

export default PoliticaProd;