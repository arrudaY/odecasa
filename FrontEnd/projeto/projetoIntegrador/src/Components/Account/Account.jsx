import styles from './Account.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


const Account = () => {
    const navigate = useNavigate();

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
        } else if (email.length < 11) {
            errors.email = 'E-mail curto demais.';
        }
      
        if (!senha) {
          errors.senha = 'O campo Senha é obrigatório.';
        } else if (senha.length < 8) {
          errors.senha = 'A senha deve ter pelo menos 8 caracteres.';
        }
      
        if (!confirmacaoSenha) {
          errors.confirmacaoSenha = 'O campo Confirmação de Senha é obrigatório.';
        } else if (senha !== confirmacaoSenha) {
          errors.confirmacaoSenha = 'As senhas não coincidem.';
        }

        return errors;
    };

    async function cadastrar() {
        try {
          const response = await api.post("/usuario", {
            nome: nome,
            sobreNome: sobrenome,
            username: email,
            password: senha,
            funcao: {
                nome: "ROLE_ADMIN"
            }
        }, { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          }})
          console.log(response.data);
          navigate("/");
        } catch (error) {
          console.log(error)
          alert("Erro ao cadastrar novo usuario");
        }
      }

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            console.log('Formulário válido. Envie-o para o servidor.');
            setErrors({});
            cadastrar();
        } else {
            setErrors(errors);
        }
    };
    
    return (
        <div className={styles.accountContainer}>
            <form className={styles.accountForm} onSubmit={handleSubmit}>
                <h1 className={styles.accountTitle}>Criar conta</h1>

                <div className={styles.inputs}>
                <div className={styles.accountName}>
                    <div className={styles.accountFloat}>
                        <label className={styles.accountLabel}>Nome</label>
                        <input 
                            className={styles.accountTxt}
                            type="text" 
                            value={nome}
                            placeholder='Nome'
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
                            placeholder='Sobrenome'
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
                        placeholder='Email'
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
                            placeholder='Senha'
                            onChange={(event) => setSenha(event.target.value)}
                        />
                        <span onClick={toggleMostrarSenha}>
                            {iconeMostrarSenha === "primeiro-icone" ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}  
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
                        placeholder='Confirmar senha'
                        onChange={(event) => setConfirmacaoSenha(event.target.value)}
                    />
                    {errors.confirmacaoSenha && <span className={styles.accountError}>{errors.confirmacaoSenha}</span>}
                </div>


                </div>
                
                <div className={styles.accountConfirm}>
                    <button className={styles.accountBtn} type="submit">Cadastre-se</button>
                    <div className={styles.navigate}>
                        <p>Já tem uma conta?</p>
                        <p><Link to={"/login"} className={styles.link}>Iniciar sessão </Link></p>
                    </div>                
                </div>

            </form>
        </div>
    )
}

export default Account;