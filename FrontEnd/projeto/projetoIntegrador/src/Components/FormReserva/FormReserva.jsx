import styles from "./FormReserva.module.css";
import { useContext, useState, useEffect } from "react";
import api from "../../Services/api";
import { AuthContext } from "../../Contexts/AuthContext";
import { ProdContext } from "../../Contexts/ProdContext";

const FormReserva = () => {  
    const [isLoading, setIsLoading] = useState(true);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');
    
    const { saveIdUsuario } = useContext(AuthContext); 
    const { produto } = useContext(ProdContext);

    async function getUsuarios(token){
        try{
            const response = await api.get("/usuario", {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              }});
            const u = response.data;
            const email = localStorage.getItem("ctd_email");
            for(var i = 0; i < u.length; i++){
                if(u[i].username == email){
                    saveIdUsuario(u[i].id)
                    setNome(u[i].nome);
                    setSobrenome(u[i].sobreNome);
                    setEmail(email);
                    setCidade(produto.cidade.nome + ", " + produto.cidade.pais);
                    break;
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            alert("Erro ao tentar pegar dados do Usuário");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("ctd_token");
        if(token != null)
            getUsuarios(token);
        else
            setIsLoading(true);
    }, []);

    if(isLoading)
    {
        return (
            <div className={styles.formReservaContainer}></div>
        );
    }

    return (
        <div className={styles.formReservaContainer}>

            <h1>Complete seus dados</h1>
            
            <form className={styles.form}>
                <div className={styles.formReserva}>
                    <label className={styles.reservaLabel}>Nome</label>
                    <input type="text" value={nome} className={styles.reservaTxt} onChange={(event) => setNome(event.target.value)}/> 
                </div>
                <div className={styles.formReserva}>
                    <label className={styles.reservaLabel}>Sobrenome</label>
                    <input type="text" value={sobrenome} className={styles.reservaTxt} onChange={(event) => setSobrenome(event.target.value)}/> 
                </div>
            
                <div className={styles.formReserva}>
                    <label className={styles.reservaLabel}>Email</label>
                    <input type="email" value={email} className={styles.reservaTxt} onChange={(event) => setEmail(event.target.value)}/> 
                </div>
                <div className={styles.formReserva}>
                    <label className={styles.reservaLabel}>Cidade</label>
                    <input type="text" value={cidade} className={styles.reservaTxt} onChange={(event) => setCidade(event.target.value)}/> 
                </div>
            </form>
        </div>
    );
};

export default FormReserva;