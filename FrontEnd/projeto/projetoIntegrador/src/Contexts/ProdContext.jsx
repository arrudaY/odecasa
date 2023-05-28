import { createContext, useEffect, useState } from "react";

export const ProdContext = createContext({});

const ProdProvider = ({ children }) => {
  const [id, setId] = useState(0);
  const [produto, setProduto] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("ctd_token");
    console.log("Token no contexto: " + token);

    // Aqui vai acessar a API para pegar dados do produto
    obterProduto();
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
        avaliacao: 4.5,
        caracteristicas: [
          {
            id: 0,
            nome: "Wi-Fi",
            icone: "wifi"
          },
          {
            id: 1,
            nome: "Cozinha",
            icone: "kitchen"
          },
          {
            id: 2,
            nome: "Televisão",
            icone: "tv"
          },
          {
            id: 3,
            nome: "Ar-condicionado",
            icone: "ac_unit"
          },
          {
            id: 4,
            nome: "Piscina",
            icone: "pool"
          },
          {
            id: 5,
            nome: "Aceitas Pets",
            icone: "pets"
          },
          {
            id: 6,
            nome: "Estacionamento",
            icone: "local_parking"
          }
        ],
        politicas: {
          checkin: "14:00",
          checkout: "12:00",
          regras: ["Não fumar", "Não é permitido festas"],
          saudeSeg: ["Diretrizes de distanciamento social e outras regulamentações relacionadas ao coronavírus se aplicam",
                     "Detector de fumaça", "Câmeras de vigilância externa"],
          cancelamento: ["O cancelamento é reembolsável até dois dias antes do início da reserva"]
        }
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