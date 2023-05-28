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
        nome: "Teste",
        descricao: "Descricao do produto teste",
        categoria: "Hotel",
        cidade: "Manaus, AM",
        avaliacao: 4.5
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