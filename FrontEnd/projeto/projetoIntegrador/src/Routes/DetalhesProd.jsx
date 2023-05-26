import Detalhes from "../Components/Detalhes/Detalhes";
import ProdProvider from "../Contexts/ProdContext";

const DetalhesProd = () => {
  return (
    <>
      <ProdProvider>
        <Detalhes />
      </ProdProvider>
    </>
  );
};

export default DetalhesProd;