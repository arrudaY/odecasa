import styles from "./HeaderProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import { useNavigate } from "react-router-dom";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Rating from '@mui/material/Rating';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';


const HeaderProd = (props) => {    
    const { id, produto } = useContext(ProdContext);
    const navigate = useNavigate();

    function voltar(){
        if(props.tela === "produto")
            navigate("/");
        else{
            navigate("/detalhes/" + id);
        }
    }

    function verificarAvalicao(){
        if((produto.qualificacao > 4.0) && (produto.qualificacao <= 5.0))
            return "Maravilhoso";
        else if((produto.qualificacao > 3.0) && (produto.qualificacao <= 4.0))
            return "Muito bom";
        else if((produto.qualificacao > 2.0) && (produto.qualificacao <= 3.0))
            return "Razoável";
        else if((produto.qualificacao > 1.0) && (produto.qualificacao <= 2.0))
            return "Regular";
        else if(produto.qualificacao <= 1.0)
            return "Ruim";
    }
    
    return (
        <div className={styles.headerContainer}>

            <div className={styles.subheader}>

                <div className={styles.info}>
                    <p className={styles.headerCategoria}>{produto.categoria.descricao}</p>

                    <div className={styles.cardAvaliacao}>

                        <div className={styles.cardClassificacao}>

                            <p>{verificarAvalicao()}</p>

                            <Rating
                            name="read-only"
                            value={produto.qualificacao}
                            precision={0.5}
                            size="small"
                            sx={{color: '#5581FB'}}
                            readOnly />
                        </div>

                        <div className={styles.cardNota}>
                            <span>{(produto.qualificacao * 2.0).toFixed(1)}</span>
                        </div>
                    </div>
                </div>
                
                <p className={styles.headerTitulo}>{produto.nome}</p>

            </div>

            <div className={styles.headerEndereco}>
                <PlaceOutlinedIcon/>
                <p>{produto.cidade.nome}, {produto.cidade.pais}</p>
            </div>

            <button onClick={voltar} className={styles.headerVoltar}><KeyboardArrowLeftOutlinedIcon/></button>
        </div>
    );
};

export default HeaderProd;