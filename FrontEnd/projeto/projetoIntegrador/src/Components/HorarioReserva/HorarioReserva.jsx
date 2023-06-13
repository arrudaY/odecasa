import styles from "./HorarioReserva.module.css";
import { useState } from "react";
import { BsCheckCircle } from  'react-icons/bs';

const HorarioReserva = () => {
    const horarios = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    const [horarioSelecionado, setHorarioSelecionado] = useState()

  const handleSelect = (event) => {
    const horarioSelecionado = event.target.value;
    setHorarioSelecionado(horarioSelecionado);
  };

  return (
    <div className={styles.horarioContainer}>
      <h1>Seu horário de chegada</h1>
      <div className={styles.horario}>
        <h3> <BsCheckCircle /> Seu quarto estará pronto para check-in entre 10h00 e 23h00</h3>
        <p className={styles.horarioTxt}>Indique a sua hora prevista de chegada</p>
        
        <select onChange={handleSelect} value={horarioSelecionado} className={styles.horariosSelect}>
          <option disabled value="">Selecione sua hora de chegada</option>
          {horarios.map((horario, index) => (
            <option key={index} value={horario}>{horario}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HorarioReserva;