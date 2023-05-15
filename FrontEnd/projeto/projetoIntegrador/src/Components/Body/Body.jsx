import Account from "../Account/Account";
import Categorias from "../Categorias/Categorias";
import styles from "./Body.module.css";

const Body = () => {

  return (
      <body>
        <div className={styles.bodyContainer}>
          <Categorias />
          <h2>Recomendações</h2>
        </div>
      </body>
  );
};

export default Body;