import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { ProdContext } from "../../Contexts/ProdContext";
import { ReservaContext } from "../../Contexts/ReservaContext";
import { useNavigate } from "react-router-dom";
import erroImg from "../../Data/erro.png"
import api from "../../Services/api";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const Login = () => {
    const { saveEmail, saveToken, setEstadoLogin } = useContext(AuthContext); 
    const { msgLogin, mudarMsgLogin } = useContext(ReservaContext); 
    const { id } = useContext(ProdContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
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

        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            console.log('Formulário válido. Envie-o para o servidor.');
            setErrors({});
            logarAPI();
        } else {
            setErrors(errors);
        }
    };

    function logar() {
        setEstadoLogin("Logout");
        if(msgLogin === true){
            mudarMsgLogin(false);
            navigate("/detalhes/" + id);
        }
        else
            navigate("/");
    }

    async function logarAPI() {
        try {
          const response = await api.post("/auth",{ 
            username: email,
            password: senha,
        }, { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }})
          console.log(response.data);
          saveToken(response.data.token);
          saveEmail(email);
          setEstadoLogin("Logout");
          if(msgLogin === true){
            mudarMsgLogin(false);
            navigate("/detalhes/" + id);
          }
          else
            navigate("/");
        } catch (error) {
          console.log(error)
          alert("Erro ao logar");
        }
      }

    return(
        <div className={styles.loginContainer}>

            <div className={styles.loginCentralizar}>

                {msgLogin && <div className={styles.loginErroRes}>
                    <ErrorOutlineOutlinedIcon fontSize='large' sx={{ color: "red" }}/>
                    <p className={styles.loginErroResMsg}>Você precisa estar logado para fazer uma reserva.</p>
                </div>}

                <form className={styles.loginForm} onSubmit={handleSubmit}>

                    <h1 className={styles.loginTitle}>Iniciar sessão</h1>

                    <div className={styles.inputs}>
                        <div className={styles.loginFloat}>
                            <label className={styles.loginLabel}>E-mail</label>
                            <input  
                                className={styles.loginTxt}
                                type="email" 
                                value={email}
                                placeholder='Email'
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            {errors.email && <span className={styles.loginError}>{errors.email}</span>}
                        </div>

                        <div className={styles.loginFloat}>
                            <label className={styles.loginLabel}>Senha</label>
                            <div className={styles.loginPassword}>
                                <input  
                                    className={styles.loginTxt}
                                    type={mostrarSenha ? "text" : "password"}
                                    value={senha}
                                    placeholder='Senha'
                                    onChange={(event) => setSenha(event.target.value)}
                                />
                                <span onClick={toggleMostrarSenha}>
                                    {iconeMostrarSenha === "primeiro-icone" ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}  
                                </span>
                            </div>
                            {errors.senha && <span className={styles.loginError}>{errors.senha}</span>}
                        </div>
                    </div>

                    <div className={styles.loginConfirm}>
                        <button className={styles.loginBtn} type="submit">Entrar</button>
                        <div className={styles.navigate}>
                            <p>Ainda não tem conta?</p>
                            <p><Link to={"/cadastro"} className={styles.link}>Registre-se</Link></p>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login;