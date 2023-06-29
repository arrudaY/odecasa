import { createContext, useState } from "react";

export const FormContext = createContext({});

const FormProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    qualificacao:0,
    titulo:"",
    imagemList: [],
    categoria: {
      id: 0,
      descricao: "",
      urlImagem: ""
    },
    cidade: {
      id: 0,
      nome: "",
      pais: ""
    },
    caracteristicaList: [],
    politicas:{
      normasDaCasa: "",
      saudeESeguranca: "",
      politicasDeCancelamento: ""
    },
    endereco:{
      endereco:"",
      latitude:"",
      longitude:""
  }});
  const [isLoading, setIsLoading] = useState([1, 1]);

  return (
    <FormContext.Provider
      value={{ categorias, setCategorias, cidades, setCidades, produto, setProduto, isLoading, setIsLoading }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;