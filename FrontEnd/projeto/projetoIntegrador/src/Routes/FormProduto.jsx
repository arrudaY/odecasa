import api from "../Services/api";
import { useEffect , useState } from "react";
import { useContext } from "react";
import { FormContext } from "../Contexts/FormContext";
import FormProd from "../Components/FormProd/FormProd";

const FormProduto = () => {
  const { categorias, setCategorias, cidades, setCidades, isLoading, setIsLoading } = useContext(FormContext);
  
  async function getCategorias(){
    try {
      const response = await api.get("/categoria",
      { headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }});
      console.log(response.data);
      setCategorias(response.data);
      if(isLoading[0] != 0)
      {
        let aux = isLoading;
        aux[0] = 0;
        setIsLoading(aux);
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getCidades(){
    try {
      const response = await api.get("/cidade",
      { headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }});
      console.log(response.data);
      setCidades(response.data);
      if(isLoading[1] != 0)
      {
        let aux = isLoading;
        aux[1] = 0;
        setIsLoading(aux);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategorias();
    getCidades();
  }, [isLoading]);

  return (
    <FormProd />
  );
};

export default FormProduto;