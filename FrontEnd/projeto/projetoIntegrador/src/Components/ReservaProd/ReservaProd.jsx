import styles from "./ReservaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import { DateRangePicker } from "rsuite";

const ReservaProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.reservaContainer}>            
            <h2>Escolha as suas datas</h2>
            <div className="divisoria"></div>
            <div className={styles.reservaReserva}>
                <DateRangePicker size="lg" placeholder="Checkin ~ Checkout" format={"dd-MM-yyyy"} className={styles.reservaTxt} />
                <button className={styles.reservaBtn}>Fazer Reserva</button>
            </div>
        </div>
    );
};

export default ReservaProd;