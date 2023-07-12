import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [stsLogin, setStsLogin] = useState("Login");
  const [idUsuario, setIdUsuario] = useState(0);
  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("ctd_token");
    console.log("Token no contexto: " + token);
    if(token == null)
      setStsLogin("Login");
    else
      setStsLogin("Logout");
  }, []);

  function saveIdUsuario(id){
    setIdUsuario(id);
  }
  
  function saveEmail(email) {
    localStorage.setItem("ctd_email", email);
  }

  function saveToken(token) {
    localStorage.setItem("ctd_token", token);
  }

  function removeUserStorage() {
    localStorage.removeItem("ctd_email");
    localStorage.removeItem("ctd_token");
  }

  function setEstadoLogin(login){
    setStsLogin(login);
  }

  return (
    <AuthContext.Provider
      value={{ idUsuario, saveIdUsuario, saveEmail, removeUserStorage, saveToken, stsLogin, setEstadoLogin, nome, setNome, sobreNome, setSobreNome }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;