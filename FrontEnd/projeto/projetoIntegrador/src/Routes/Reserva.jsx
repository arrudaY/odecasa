import { useContext, useEffect } from "react";
import { ReservaContext } from "../Contexts/ReservaContext";
import { ProdContext } from "../Contexts/ProdContext";
import TelaReserva from "../Components/TelaReserva/TelaReserva";
import { useParams } from "react-router-dom";

const Reserva = () => {
  const { id } = useParams();
  const { saveId } = useContext(ProdContext);
  const { reserva, salvarReserva } = useContext(ReservaContext); 
  
  useEffect(() => {
    saveId(id);

    salvarReserva({
      id: 1,
      horaIni: "14:00",
      dataIni: "20-06-2023",
      dataFim: "30-06-2023"
    });
  }, []);

    return (
      <>
        <TelaReserva />
      </>
    );
  };
  
  export default Reserva;