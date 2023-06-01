import styles from "./ImgProd.module.css";
import { useContext } from "react";
//import { ProdContext } from "../../Contexts/ProdContext";
import Gallery from "../../Components/Gallery/Gallery";


const ImgProd = () => {    
    //const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.imgContainer}>
           <Gallery />
        </div>
    );
};

export default ImgProd;