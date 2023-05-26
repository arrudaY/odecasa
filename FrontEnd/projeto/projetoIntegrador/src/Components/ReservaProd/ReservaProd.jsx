import styles from "./ReservaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const ReservaProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.reservaContainer}>
            Hello World Reserva - ID: {id}
        </div>
    );
};

export default ReservaProd;