import styles from "./FormReserva.module.css";
import { useState } from "react";

const FormReserva = () => {  
    
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');

    return (
        <div className={styles.formReservaContainer}>
            <h1>Complete seus dados</h1>
            <form className={styles.form}>
                <div className={styles.formReserva}>
                    <label className={styles.reservaLabel}>Nome</label>
                    <input type="text" value={nome} className={styles.reservaTxt}/> 
                
                    <label className={styles.reservaLabel}>Sobrenome</label>
                    <input type="text" value={sobrenome} className={styles.reservaTxt}/> 
                </div>
            
                <div className={styles.formReserva}>
                    <label className={styles.reservaLabel}>Email</label>
                    <input type="email" value={email} className={styles.reservaTxt}/> 
                
                    <label className={styles.reservaLabel}>Cidade</label>
                    <input type="text" value={cidade} className={styles.reservaTxt}/> 
                </div>
            </form>
        </div>
    );
};

export default FormReserva;