import { createContext, useEffect, useState } from "react";

export const ProdContext = createContext({});

const ProdProvider = ({ children }) => {
  const [id, setId] = useState(0);
  const [produto, setProduto] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("ctd_token");
    console.log("Token no contexto: " + token);

    // Aqui vai acessar a API para pegar dados do produto
  }, []);
  
  function saveId(id) {
    setId(id);
  }

  function obterProduto(){
    const token = localStorage.getItem("ctd_token");
    console.log("Token no contexto: " + token);

    // Aqui vai acessar a API para pegar dados do produto
    var prod = {
        id:5,
        nome: "teste",
        descricao: "Descricao do produto teste"
    }
    setProduto(prod);
  }

  return (
    <ProdContext.Provider
      value={{ saveId, obterProduto, produto, id }}
    >
      {children}
    </ProdContext.Provider>
  );
};

export default ProdProvider;