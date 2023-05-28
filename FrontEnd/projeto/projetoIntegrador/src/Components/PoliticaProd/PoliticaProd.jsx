import styles from "./PoliticaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const PoliticaProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.politicaContainer}>
            <h2>O que você precisa saber?</h2>
            <div className="divisoria"></div>
            <div className={styles.politicaPoliticas}>
                <div className={styles.politicaRegras}>
                    <h3>Regras da Casa</h3>
                    <p>Checkin: {produto.politicas.checkin}</p>
                    <p>CheckOut: {produto.politicas.checkout}</p>
                    {produto.politicas.regras.map((item) => (
                        <p key={item}>{item}</p>
                    ))}
                </div>
                <div className={styles.politicaSaudeSeg}>
                    <h3>Saúde e Segurança</h3>
                    {produto.politicas.saudeSeg.map((item) => (
                        <p key={item}>{item}</p>
                    ))}
                </div>
                <div className={styles.politicaCancelamento}>
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