import { createContext, useEffect, useState } from "react";

export const ReservaContext = createContext({});

const ReservaProvider = ({ children }) => {
  const [msgLogin, setMsgLogin] = useState(false);
  const [reserva, setReserva] = useState({});
  const [horaIni, setHoraIni] = useState("00:00:00");
  const [dataIni, setDataIni] = useState(new Date());
  const [dataFim, setDataFim] = useState(new Date());

  function mudarMsgLogin(estado){
    setMsgLogin(estado);
  }

  function salvarReserva(res){
    setReserva(res);
  }

  return (
    <ReservaContext.Provider
      value={{ horaIni, dataIni, dataFim, setHoraIni, setDataIni, setDataFim, msgLogin, mudarMsgLogin, reserva, salvarReserva }}
    >
      {children}
    </ReservaContext.Provider>
  );
};

export default ReservaProvider;