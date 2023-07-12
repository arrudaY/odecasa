import Body from "../Components/Body/Body";
import Buscador from "../Components/Buscador/Buscador";
import { useContext } from "react";
import { ReservaContext } from "../Contexts/ReservaContext";
import { useEffect, useState } from "react";

const Home = () => {
  const { setDataIni, setDataFim } = useContext(ReservaContext); 

  useEffect(() => {
    setDataIni(new Date());
    setDataFim(new Date());
  }, []);

  return (
    <>
        <Body />
    </>
  );
};

export default Home;