import styles from "./CardBusca.module.css";
import { useNavigate } from "react-router-dom";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';

const CardBusca = (props) => {
  const navigate = useNavigate();

  function acessar() {
    navigate(`/detalhes/${props.produto.id}`);
  }

  function verificarAvalicao(){
    if((props.produto.qualificacao > 4.0) && (props.produto.qualificacao <= 5.0))
        return "Maravilhoso";
    else if((props.produto.qualificacao > 3.0) && (props.produto.qualificacao <= 4.0))
        return "Muito bom";
    else if((props.produto.qualificacao > 2.0) && (props.produto.qualificacao <= 3.0))
        return "Razoável";
    else if((props.produto.qualificacao > 1.0) && (props.produto.qualificacao <= 2.0))
        return "Regular";
    else if(props.produto.qualificacao <= 1.0)
        return "Ruim";
}

  return (

    <div className={styles.cardBuscaContainer}>

      <img src={props.produto.imagemList[0].url} className={styles.cardBuscaImg}/>
      
      <div className={styles.cardDetalhes}>

        <div className={styles.cardHeader}>

          <div className={styles.cardSubHeader}>

            <h3>{props.produto.categoria.descricao}</h3>
            
            <div className={styles.cardAvaliacao}>

              <div className={styles.cardClassificacao}>
                <p>{verificarAvalicao()}</p>
                <div className="stars"> 
                  <span className={`star ${props.produto.qualificacao >= 1.0 ? "on" : props.produto.qualificacao == 0.0 ? "" : "half"}`}></span>
                  <span className={`star ${props.produto.qualificacao >= 2.0 ? "on" : props.produto.qualificacao <= 1.0 ? "" : "half"}`}></span>
                  <span className={`star ${props.produto.qualificacao >= 3.0 ? "on" : props.produto.qualificacao <= 2.0 ? "" : "half"}`}></span>
                  <span className={`star ${props.produto.qualificacao >= 4.0 ? "on" : props.produto.qualificacao <= 3.0 ? "" : "half"}`}></span>
                  <span className={`star ${props.produto.qualificacao == 5.0 ? "on" : props.produto.qualificacao <= 4.0 ? "" : "half"}`}></span>
                </div>
              </div>

              <div className={styles.cardNota}>
                <span>{(props.produto.qualificacao * 2.0).toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className={styles.cardTitulo}>
            <h2>{props.produto.nome}</h2>
          </div>

          <div className={styles.cardEndereco}>
            <PlaceOutlinedIcon />
            <p>{props.produto.cidade.nome}, {props.produto.cidade.pais}</p>
          </div>

        </div>

        <div className={styles.cardDescricao}>
          <p>{props.produto.descricao}</p>
        </div>

        <div className={styles.cardBtn}>
          <button onClick={acessar}>Ver mais</button>
        </div>
      </div>
    </div>
  );
};

export default CardBusca;