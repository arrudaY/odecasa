import { createContext, useEffect, useState } from "react";

export const ReservaContext = createContext({});

const ReservaProvider = ({ children }) => {

  return (
    <ReservaContext.Provider
    >
      {children}
    </ReservaContext.Provider>
  );
};

export default ReservaProvider;