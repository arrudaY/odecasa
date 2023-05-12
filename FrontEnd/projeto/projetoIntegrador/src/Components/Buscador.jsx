import styles from "./Buscador.module.css";

const Buscador = () => {

  return (
      <div>
        <div className={styles.buscadorContainer}>
            <h1>Buscar acomodações</h1>
            <div className={styles.buscadorInputs}>
              <input className={styles.buscadorTxt} type="text" placeholder="Local"></input>
              <input className={styles.buscadorTxt} type="text" placeholder="Datas"></input>
              <button className={styles.buscadorBtn}>Buscar</button>
            </div>
        </div>
      </div>
  );
};

export default Buscador;