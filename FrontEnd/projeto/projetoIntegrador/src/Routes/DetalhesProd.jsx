import Detalhes from "../Components/Detalhes/Detalhes";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProdContext } from "../Contexts/ProdContext";
import { useEffect } from 'react';

const DetalhesProd = () => {
  const { id } = useParams();
  const { saveId } = useContext(ProdContext);

  useEffect(() => {
      saveId(id);
  }, []);

  return (
    <>
      <Detalhes />
    </>
  );
};

export default DetalhesProd;