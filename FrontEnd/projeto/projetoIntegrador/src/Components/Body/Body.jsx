import Categorias from "../Categorias/Categorias";
import styles from "./Body.module.css";
import CardBusca from "../CardBusca/CardBusca"

const Body = () => {

  return (
      <body>
        <div className={styles.bodyContainer}>
          <Categorias />
          <h2>Recomendações</h2>
          <div className={styles.bodyCards}>
            <CardBusca />
            <CardBusca />
            <CardBusca />
            <CardBusca />
          </div>
        </div>
      </body>
  );
};

export default Body;