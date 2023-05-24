import styles from "./Detalhes.module.css";
import { useParams } from "react-router-dom";

const Detalhes = () => {
    const { id } = useParams();

    return (
        <div className={styles.detalhesContainer}>
            Hello World - ID: {id}
        </div>
    );
};

export default Detalhes;