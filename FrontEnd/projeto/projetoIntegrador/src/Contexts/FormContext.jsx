import { createContext, useState } from "react";

export const FormContext = createContext({});

const FormProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [produto, setProduto] = useState({});
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