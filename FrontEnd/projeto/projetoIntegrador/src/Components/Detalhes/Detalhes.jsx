import CaractProd from "../CaractProd/CaractProd";
import DescProd from "../DescProd/DescProd";
import HeaderProd from "../HeaderProd/HeaderProd";
import ImgProd from "../ImgProd/ImgProd";
import LocalProd from "../LocalProd/LocalProd";
import PoliticaProd from "../PoliticaProd/PoliticaProd";
import ReservaProd from "../ReservaProd/ReservaProd";
import styles from "./Detalhes.module.css";

const Detalhes = () => {
    return (
        <div className={styles.detalhesContainer}>
            <HeaderProd />
            <LocalProd />
            <ImgProd />
            <DescProd />
            <CaractProd />
            <ReservaProd />
            <PoliticaProd />
        </div>
    );
};

export default Detalhes;