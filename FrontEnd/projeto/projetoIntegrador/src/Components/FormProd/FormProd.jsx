import styles from "./FormProd.module.css";
import { useContext } from "react";
import { FormContext } from "../../Contexts/FormContext";
import imgVoltar from "../../Data/back.png"
import { useNavigate } from "react-router-dom";
import addImg from "../../Data/add.png"

const FormProd = () => {
    const { categorias, setCategorias, cidades, setCidades, isLoading, setIsLoading } = useContext(FormContext);
    const navigate = useNavigate();

    function voltar(){
        navigate("/");
    }

    if((isLoading[0] != 0) || (isLoading[1] != 0))
    {
        return (
            <div className={styles.formContainer}>
            </div>
          );
    }

    return (
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
            <p>Administração</p>
            <img onClick={voltar} className={styles.formVoltar} src={imgVoltar}></img>
        </div>
        <div className={styles.formFundo}>
            <div className={styles.formContainer2}>
                <h2>Criar nova acomodação</h2>
                <div className={styles.formBlocao}>
                    <div className={styles.blocaoTxtBasico}>
                        <label className={styles.formLabel}>Nome da Acomodação</label>
                        <input type="text" className={styles.formTxt}/> 
                    </div>
                    <div className={styles.blocaoTxtBasico}>
                        <label className={styles.formLabel}>Categoria</label>
                        <input type="text" className={styles.formTxt}/> 
                    </div>
                    <div className={styles.blocaoTxtBasico}>
                        <label className={styles.formLabel}>Endereço</label>
                        <input type="text" className={styles.formTxt}/> 
                    </div>
                    <div className={styles.blocaoTxtBasico}>
                        <label className={styles.formLabel}>Cidade</label>
                        <input type="text" className={styles.formTxt}/> 
                    </div>
                    <div className={styles.blocaoTxtBasicoDesc}>
                        <label className={styles.formLabel}>Descrição curta</label>
                        <input type="text" className={styles.formTxtDesc}/> 
                    </div>
                    <div className={styles.blocaoTxtBasicoDesc}>
                        <label className={styles.formLabel}>Descrição longa</label>
                        <input type="text" className={styles.formTxtDesc}/> 
                    </div>
                    <h3>Adicionar atributos</h3>
                    <div className={styles.formAtributos}>
                        <div className={styles.formAtributosTxts}>
                            <div className={styles.formTxtAtributos}>
                                <label className={styles.formLabel}>Nome</label>
                                <input type="text" className={styles.formTxt}/> 
                            </div>
                            <div className={styles.formTxtAtributos}>
                                <label className={styles.formLabel}>Ícone</label>
                                <input type="text" className={styles.formTxt}/> 
                            </div>
                        </div>
                        <img className={styles.formAddImg} src={addImg}></img>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default FormProd;