import { createContext, useEffect, useState } from "react";

export const ReservaContext = createContext({});

const ReservaProvider = ({ children }) => {
  const [msgLogin, setMsgLogin] = useState(false);

  function mudarMsgLogin(estado){
    setMsgLogin(estado);
  }

  return (
    <ReservaContext.Provider
      value={{ msgLogin, mudarMsgLogin }}
    >
      {children}
    </ReservaContext.Provider>
  );
};

export default ReservaProvider;