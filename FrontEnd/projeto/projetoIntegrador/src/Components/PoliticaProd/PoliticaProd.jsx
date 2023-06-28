import styles from "./PoliticaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';

const PoliticaProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.politicaContainer}>

            <h2>O que você precisa saber</h2>

            <div className={styles.divisor}></div>

            <div className={styles.politicaPoliticas}>
                <div className={styles.politicaRegras}>
                    <ListAltOutlinedIcon fontSize="large" sx={{ color: "black" }}/>
                    <h3>Regras da Casa</h3>
                    <p>Checkin: {produto.politicas.checkin}</p>
                    <p>CheckOut: {produto.politicas.checkout}</p>
                    {produto.politicas.regras.map((item) => (
                        <p key={item}>{item}</p>
                    ))}
                </div>

                <div className={styles.politicaSaudeSeg}>
                    <HealthAndSafetyOutlinedIcon fontSize="large" sx={{ color: "black" }}/>
                    <h3>Saúde e Segurança</h3>
                    {produto.politicas.saudeSeg.map((item) => (
                        <p key={item}>{item}</p>
                    ))}
                </div>

                <div className={styles.politicaCancelamento}>
                    <EventBusyOutlinedIcon fontSize="large" sx={{ color: "black" }}/>
                    <h3>Política de Cancelamento</h3>
                        {produto.politicas.cancelamento.map((item) => (
                            <p key={item}>{item}</p>
                        ))}
                </div>
                
            </div>
        </div>
    );
};

export default PoliticaProd;