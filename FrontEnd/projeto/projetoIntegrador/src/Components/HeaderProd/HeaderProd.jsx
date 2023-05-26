import styles from "./HeaderProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const HeaderProd = () => {    
    const { id, produto } = useContext(ProdContext);
    
    return (
        <div className={styles.headerContainer}>
            Hello World Header - ID: {id}
        </div>
    );
};

export default HeaderProd;