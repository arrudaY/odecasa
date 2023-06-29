import styles from "./HorarioReserva.module.css";
import { useState } from "react";
import { useContext } from "react";
import { ReservaContext } from "../../Contexts/ReservaContext";
import { ProdContext } from "../../Contexts/ProdContext";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const HorarioReserva = () => {
    const horarios = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    const [horarioSelecionado, setHorarioSelecionado] = useState();
    const { horaIni, setHoraIni } = useContext(ReservaContext); 
    const { produto } = useContext(ProdContext);

  const handleSelect = (event) => {
    const horarioSelecionado = event.target.value;
    setHorarioSelecionado(horarioSelecionado);
    setHoraIni(event.target.value + ":00");
  };

function buscaCheckin(){
    let fim = produto.politicas.normasDaCasa.indexOf(";");
    return produto.politicas.normasDaCasa.slice(fim - 5, fim);
}

function buscaCheckout(){
    let fim = produto.politicas.normasDaCasa.indexOf(";");
    let aux = produto.politicas.normasDaCasa.slice(fim + 1);
    let fim2 = aux.indexOf(";");
    return aux.slice(fim2 - 5, fim2);
}

  return (
    <div className={styles.horarioContainer}>

      <h1>Seu horário de chegada</h1>

      <div className={styles.horario}>

        <div className={styles.horarioAviso}>
          <CheckCircleOutlineIcon/>
          <p> Seu quarto estará pronto para check-in entre {buscaCheckin()} e {buscaCheckout()}</p>
        </div>

        <div className={styles.horarioSelect}>
          <p className={styles.horarioTxt}>Indique a sua hora prevista de chegada</p>
          
          <select onChange={handleSelect} value={horarioSelecionado} className={styles.horariosSelect}>
            <option disabled value="" selected>Selecione sua hora de chegada</option>
            {horarios.map((horario, index) => (
              <option key={index} value={horario}>{horario}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HorarioReserva;