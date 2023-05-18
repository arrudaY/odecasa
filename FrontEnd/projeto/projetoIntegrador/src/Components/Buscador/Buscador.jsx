import { DateRangePicker } from 'rsuite';
import styles from "./Buscador.module.css";

const Buscador = () => {

  return (
      <div className="sticky-buscador">
        <div className={styles.buscadorContainer}>
            <h1>Buscar acomodações</h1>
            <div className={styles.buscadorInputs}>
              <input className={styles.buscadorTxt} type="text" placeholder=" Local"></input>
              <DateRangePicker size="lg" placeholder="Checkin ~ Checkout" format={"dd-MM-yyyy"} className={styles.buscadorTxt}/>
              <button className={styles.buscadorBtn}>Buscar</button>
            </div>
        </div>
      </div>
  );
};

export default Buscador;