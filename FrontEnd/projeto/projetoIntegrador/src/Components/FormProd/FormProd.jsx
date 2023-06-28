import styles from "./FormProd.module.css";
import { useContext } from "react";
import { FormContext } from "../../Contexts/FormContext";
import imgVoltar from "../../Data/back.png"
import { useNavigate } from "react-router-dom";
import addImg from "../../Data/add.png"
import uploadImg from "../../Data/upload.png"

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
                        <textarea className={styles.formTxtDesc}/> 
                    </div>
                    <div className={styles.blocaoTxtBasicoDesc}>
                        <label className={styles.formLabel}>Descrição longa</label>
                        <textarea className={styles.formTxtDesc}/> 
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
                    <h3>Políticas da Acomodação</h3>
                    <div className={styles.formPoliticas}>
                        <div className={styles.formPoliticasBloco}>
                            <h5>Regras da acomodação</h5>
                            <label className={styles.formLabel}>Checkin</label>
                            <input type="text" className={styles.formTxt}/> 
                            <label className={styles.formLabel}>Checkout</label>
                            <input type="text" className={styles.formTxt}/> 
                            <label className={styles.formLabel}>Outras regras</label>
                            <textarea className={styles.formTxtDesc}/> 
                        </div>
                        <div className={styles.formPoliticasBloco}>
                            <h5>Saúde e Segurança</h5>
                            <label className={styles.formLabel}>Diretrizes da acomodação</label>
                            <textarea className={styles.formTxtDesc}/> 
                        </div>
                        <div className={styles.formPoliticasBloco}>
                            <h5>Políticas de Cancelamento</h5>
                            <label className={styles.formLabel}>Políticas da acomodação</label>
                            <textarea className={styles.formTxtDesc}/> 
                        </div>
                    </div>
                    <h3>Carregar Imagens</h3>
                    <div className={styles.formAtributos}>
                        <h5>Imagem Principal</h5>
                        <div className={styles.formCarregarImg}>
                            <input type="text" className={styles.formCarregarImgTxt}/> 
                            <img className={styles.formUploadImg} src={uploadImg}></img>
                            <img className={styles.formAddImg} src={addImg}></img>
                        </div>
                        <h5>Outras imagens</h5>
                        <div className={styles.formCarregarImg}>
                            <input type="text" className={styles.formCarregarImgTxt}/> 
                            <img className={styles.formUploadImg} src={uploadImg}></img>
                            <img className={styles.formAddImg} src={addImg}></img>
                        </div>
                    </div>
                    <div className={styles.formCentralizaBtn}>
                        <button className={styles.formBtn}>Criar Acomodação</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default FormProd;