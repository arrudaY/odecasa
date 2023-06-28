import styles from "./DatasReserva.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import { ReservaContext } from "../../Contexts/ReservaContext";
import { useNavigate } from "react-router-dom";
import DateRangeSelector from "../DateRangeSelector/DateRangeSelector";
import { useEffect, useState } from "react";


const DatasReserva = () => {    
    const { id, produto } = useContext(ProdContext);
    const { horaIni, dataIni, dataFim, setHoraIni, setDataIni, setDataFim, reserva, salvarReserva } = useContext(ReservaContext); 
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    return (
        <div className={styles.datasResContainer}>
            <h1>Selecione sua data de reserva</h1>
            <div className={styles.datasResCalendarios}>
                {windowWidth <= 1164
                ? (<DateRangeSelector className={styles.dataResCalendario} direction="vertical"/>)
                : (<DateRangeSelector className={styles.dataResCalendario} direction="horizontal"/>)}
            </div>
        </div>
    );
};

export default DatasReserva;