import { createContext, useEffect, useState } from "react";

export const ProdContext = createContext({});

const ProdProvider = ({ children }) => {
  const [id, setId] = useState(-1);
  const [produto, setProduto] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [produtosBusca, setProdutosBusca] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("ctd_token");
    console.log("Token no contexto: " + token);
  }, []);
  
  function saveId(idAux) {
    setId(idAux);
  }

  function salvarProduto(prod){
    setProduto(prod);
  }

  function salvarLoading(aux){
    setIsLoading(aux);
  }

  return (
    <ProdContext.Provider
      value={{ produtosBusca, setProdutosBusca, produtos, setProdutos, saveId, salvarProduto, produto, id, isLoading, salvarLoading }}
    >
      {children}
    </ProdContext.Provider>
  );
};

export default ProdProvider;