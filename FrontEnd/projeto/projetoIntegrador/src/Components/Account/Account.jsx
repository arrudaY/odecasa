import styles from './Account.module.css';
import { useState } from 'react';

const Account = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const [errors, setErrors] = useState({});
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [iconeMostrarSenha, setIconeMostrarSenha] = useState(
        "primeiro-icone"
    );

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
        setIconeMostrarSenha(
          iconeMostrarSenha === "primeiro-icone"
            ? "segundo-icone"
            : "primeiro-icone"
        );
    };
      

    const validateForm = () => {
        let errors = {};
      
        if (!nome) {
          errors.nome = 'O campo Nome é obrigatório.';
        }
      
        if (!sobrenome) {
          errors.sobrenome = 'O campo Sobrenome é obrigatório.';
        }
      
        if (!email) {
          errors.email = 'O campo Email é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = 'Digite um email válido.';
        }
      
        if (!senha) {
          errors.senha = 'O campo Senha é obrigatório.';
        } else if (senha.length < 6) {
          errors.senha = 'A senha deve ter pelo menos 6 caracteres.';
        }
      
        if (!confirmacaoSenha) {
          errors.confirmacaoSenha = 'O campo Confirmação de Senha é obrigatório.';
        } else if (senha !== confirmacaoSenha) {
          errors.confirmacaoSenha = 'As senhas não coincidem.';
        }

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            console.log('Formulário válido. Envie-o para o servidor.');
            setErrors({});
        } else {
            setErrors(errors);
        }
    };
    
    return (
        <div className={styles.accountContainer}>
            <form className={styles.accountForm} onSubmit={handleSubmit}>
                <h1 className={styles.accountTitle}>Criar Conta</h1>
                <div className={styles.accountName}>
                    <div className={styles.accountFloat}>
                        <label className={styles.accountLabel}>Nome</label>
                        <input 
                            className={styles.accountTxt}
                            type="text" 
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                        />
                        {errors.nome && <span className={styles.accountError}>{errors.nome}</span>}
                    </div>
                    <div className={styles.accountFloat}>
                        <label className={styles.accountLabel}>Sobrenome</label>
                        <input  
                            className={styles.accountTxt}
                            type="text" 
                            value={sobrenome}
                            onChange={(event) => setSobrenome(event.target.value)}
                        />
                        {errors.sobrenome && <span className={styles.accountError}>{errors.sobrenome}</span>}
                    </div>
                </div>
                <div className={styles.accountFloat}>
                    <label className={styles.accountLabel}>E-mail</label>
                    <input  
                        className={styles.accountTxt}
                        type="email" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {errors.email && <span className={styles.accountError}>{errors.email}</span>}
                </div>
                <div className={styles.accountFloat}>
                    <label className={styles.accountLabel}>Senha</label>
                    <div className={styles.accountPassword}>
                        <input  
                            className={styles.accountTxt}
                            type={mostrarSenha ? "text" : "password"}
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}
                        />
                        <span onClick={toggleMostrarSenha}>
                            {iconeMostrarSenha === "primeiro-icone" 
                            ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
                                </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                            </svg>
                            }  
                        </span>
                    </div>
                    {errors.senha && <span className={styles.accountError}>{errors.senha}</span>}
                </div>
                <div className={styles.accountFloat}>
                    <label className={styles.accountLabel}>Confirmar Senha</label>
                    <input  
                        className={styles.accountTxt}
                        type="password" 
                        value={confirmacaoSenha}
                        onChange={(event) => setConfirmacaoSenha(event.target.value)}
                    />
                    {errors.confirmacaoSenha && <span className={styles.accountError}>{errors.confirmacaoSenha}</span>}
                </div>
                <div className={styles.accountConfirm}>
                    <button className={styles.accountBtn} type="submit">Criar Conta</button>
                    <p>Já tem uma conta? <a href="">Iniciar sessão</a> </p>
                </div>
            </form>
        </div>
    )
}

export default Account;