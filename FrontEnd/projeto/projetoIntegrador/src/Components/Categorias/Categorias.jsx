import styles from "./Categorias.module.css";
import img01 from "../../Data/no_image.png";
import img02 from "../../Data/no_image.png";
import img03 from "../../Data/no_image.png";
import img04 from "../../Data/no_image.png";

const Categorias = () => {

  return (
    <div className={styles.categoriasContainer}>
        <h2>Buscar por tipo de acomodação</h2>
        <div className={styles.categoriasCards}>
            <div className={styles.categoriasCard}>
                <img className={styles.categoriasImg} src={img01}/>
                <h2>Hotéis e Hostels</h2>
                <p>X acomodações</p>
            </div>
            <div className={styles.categoriasCard}>
                <img className={styles.categoriasImg} src={img02}/>
                <h2>Apartamentos inteiros</h2>
                <p>X acomodações</p>
            </div>
            <div className={styles.categoriasCard}>
                <img className={styles.categoriasImg} src={img03}/>
                <h2>Quartos</h2>
                <p>X acomodações</p>
            </div>
            <div className={styles.categoriasCard}>
                <img className={styles.categoriasImg} src={img04}/>
                <h2>Pousadas</h2>
                <p>X acomodações</p>
            </div>
        </div>
    </div>
  );
};

export default Categorias;