import styles from "./FormProd.module.css";
import { useContext, useState } from "react";
import { FormContext } from "../../Contexts/FormContext";
import { useNavigate } from "react-router-dom";
import Combobox from "react-widgets/Combobox";
import api from "../../Services/api";


import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import UndoIcon from '@mui/icons-material/Undo';


const FormProd = () => {
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState({
        id: 0,
        descricao: "",
        urlImagem: ""
    });
    const [endereco, setEndereco] = useState("");
    const [cidade, setCidade] = useState({
        id: 0,
        nome: "",
        pais: ""
    });
    const [descCurta, setDescCurta] = useState("");
    const [descLonga, setDescLonga] = useState("");
    const [atributos, setAtributos] = useState([]);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [regras, setRegras] = useState("");
    const [diretrizes, setDiretrizes] = useState("");
    const [politicas, setPoliticas] = useState("");
    const [imgPrincipal, setImgPrincipal] = useState("");
    const [imgPrinSalva, setImgPrinSalva] = useState("");
    const [imgSec, setImgSec] = useState("");
    const [imagens, setImagens] = useState([]);
    const [errors, setErrors] = useState({});
    const [novaCat, setNovaCat] = useState(false);
    const [nomeCat, setNomeCat] = useState("");
    const [urlCat, setUrlCat] = useState("");
    const [novaCid, setNovaCid] = useState(false);
    const [nomeCid, setNomeCid] = useState("");
    const [pais, setPais] = useState("");
    const [icNome, setIcNome] = useState("");
    const [icIcone, setIcIcone] = useState("");
    
    const { categorias, setCategorias, cidades, setCidades, isLoading, setIsLoading } = useContext(FormContext);
    const navigate = useNavigate();

    const horas = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
                   "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]

    function voltar(){
        navigate("/");
    }

    const validateForm = () => {
        let errors = {};
      
        if (!nome) {
          errors.nome = 'O campo Nome é obrigatório.';
        }
      
        if (!novaCat && !(categoria.id > 0)) {
          errors.categoria = 'O campo Categoria é obrigatório.';
        }

        if (novaCat && (!nomeCat || !urlCat)) {
            errors.categoria = 'O campo Categoria é obrigatório.';
        }
      
        if (!endereco) {
          errors.endereco = 'O campo Endereco é obrigatório.';
        }
      
        if (!novaCid && !(cidade.id > 0)) {
            errors.cidade = 'O campo Cidade é obrigatório.';
          }
  
        if (novaCid && (!nomeCid || !pais)) {
            errors.cidade = 'O campo Cidade é obrigatório.';
        }
      
        if (!descCurta) {
          errors.descCurta = 'O campo Descrição Curta é obrigatório.';
        }
      
        if (!descLonga) {
          errors.descLonga = 'O campo Descrição Longa é obrigatório.';
        }
      
        if (atributos.length == 0) {
          errors.atributos = 'É preciso ter ao menos um atributo cadastrado.';
        }
      
        if (!checkin) {
          errors.checkin = 'O campo Checkin é obrigatório.';
        }
      
        if (!checkout) {
          errors.checkout = 'O campo Checkout é obrigatório.';
        }
      
        if (!regras) {
          errors.regras = 'O campo Regras é obrigatório.';
        }
      
        if (!diretrizes) {
          errors.diretrizes = 'O campo Diretrizes é obrigatório.';
        }
      
        if (!politicas) {
          errors.politicas = 'O campo Politicas é obrigatório.';
        }

        if(!imgPrinSalva){
          errors.imgPrincipal = 'É preciso ter uma imagem principal cadastrada.';
        }
      
        if (imagens.length == 0) {
          errors.imagens = 'É preciso ter ao menos uma segunda imagem cadastrada.';
        }

        return errors;
    };

    async function cadastrarProduto(p, token) {
        try {
          const response = await api.post("/produto", p, { headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          }})
          console.log("Produto Novo", response.data);
          alert("Produto cadastrado com sucesso!");
          navigate("/");
        } catch (error) {
          console.log(error)
          alert("Erro ao cadastrar novo produto");
        }
    }

    async function cadastrarCategoria(p, token) {
        try {
          const response = await api.post("/categoria", {
            descricao: nomeCat,
            urlImagem: urlCat,
          }, { headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          }})
          console.log("Nova Categoria", response.data);
          p.categoria.id = response.data.id;
          if(novaCid)
            cadastrarCidade(p, token);
          else
          {
            cadastrarProduto(p, token);
          }
        } catch (error) {
          console.log(error)
          alert("Erro ao cadastrar nova categoria");
        }
    }

    async function cadastrarCidade(p, token) {
        try {
          const response = await api.post("/cidade", {
            nome: nomeCid,
            pais: pais,
          }, { headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          }})
          console.log("Nova Cidade", response.data);
          p.cidade.id = response.data.id;
          cadastrarProduto(p, token);
        } catch (error) {
          console.log(error)
          alert("Erro ao cadastrar nova categoria");
        }
    }

    function cadastrar(){
        const erros = validateForm();

        if (Object.keys(erros).length === 0) {
            console.log('Formulário válido. Envie-o para o servidor.');
            setErrors({});
            let aux = [];
            let tam = 1 + imagens.length;
            let count = 1;
            aux.push({
                titulo: "principal",
                url: imgPrinSalva});
            while(count < tam){
                aux.push({
                    titulo: "img" + count,
                    url: imagens[count - 1]});
                count++;
            }

            let p = {
                nome: nome,
                descricao: descLonga,
                qualificacao: 5.0,
                titulo: descCurta,
                imagemList: aux,
                categoria: {
                    id: categoria.id
                },
                cidade: {
                    id: cidade.id
                },
                caracteristicaList: atributos,
                politicas: {
                    normasDaCasa: "Checkin:" + checkin + ";Checkout:" + checkout + ";" + regras,
                    saudeESeguranca: diretrizes,
                    politicasDeCancelamento: politicas
                },
                endereco:{
                    endereco: endereco,
                    latitude: "",
                    longitude: ""
                }
            };

            const token = localStorage.getItem("ctd_token");
            if((token != null) && !novaCat && !novaCid)
                cadastrarProduto(p, token);
            else if(token != null)
            {
                if(novaCat)
                    cadastrarCategoria(p, token);
                else if(novaCid)
                    cadastrarCidade(p, token);
            }
            else
                alert("Você precisa estar logado para cadastrar produtos!");

        } else {
            setErrors(erros);
            alert("Há alguns erros no formulário");
        }
    }

    function criarCat(){
        if(!novaCat)
            setNovaCat(true);
        else
            setNovaCat(false);
    }

    function criarCid(){
        if(!novaCid)
            setNovaCid(true);
        else
            setNovaCid(false);
        console.log(cidade);
    }

    function addIcone(){
        if(icNome && icIcone)
        {
            let aux = atributos;
            let aux2 = {
                nome: icNome,
                icone: icIcone
            }
            aux.push(aux2);
            setAtributos(aux);
            setIcNome("");
            setIcIcone("");
        }
        else
        {
            alert("Nenhum dos campos de atributos pode estar vazio!");
        }
    }

    function apagarAtrib(n){
        setAtributos(
            atributos.filter(a =>
            a.nome !== n
            )
        );
    }

    function apagarImgLista(n){
        setImagens(
            imagens.filter(a =>
            a !== n
            )
        );
    }

    function addImgSec(){
        if(imgSec)
        {
            let aux = imagens;
            aux.push(imgSec);
            setImagens(aux);
            setImgSec("");
        }
        else
        {
            alert("O campo não pode estar vazio!");
        }
    }

    function addImgPrincipal() {
        if(imgPrincipal)
        {
            setImgPrinSalva(imgPrincipal);
            setImgPrincipal("");
        }
        else
        {
            alert("O campo não pode estar vazio!");
        }
    }

    if((isLoading[0] != 0) || (isLoading[1] != 0))
    {
        return (
            <div className={styles.formContainer}>
            </div>
          );
    }

    return (
      <div className={styles.formContainer}>

        <div className={styles.formHeader}>
            <button onClick={voltar}><KeyboardArrowLeftIcon sx={{ color: 'black' }}/></button>
            <h1>Administração</h1>
        </div>

        <div className={styles.innerForm}>

            {/*---- Nova acomodação ----*/}
            <div className={styles.section}>

                <h2>Criar nova acomodação</h2>

                {/*----Nome----*/}
                <div className={styles.blocoSXZ}>
                    <div className={styles.blocaoTxtBasico}>
                        <label>Nome do lugar</label>
                        <input type="text" value={nome} placeholder="Ex.: Hotel Sky" onChange={(event) => setNome(event.target.value)}/> 
                        {errors.nome && <span className={styles.formError}>{errors.nome}</span>}
                    </div>

                    <div className={styles.formNovaCatCid}>
                        <div className={styles.blocaoTxtCatCid}>
                            {!novaCat && <label className={styles.formLabel}>Categoria</label>}
                            <div className={styles.alinhaComboImg}>
                                <div className={styles.formComboBox}>
                                    {!novaCat && <Combobox
                                        value={categoria}
                                        defaultValue=""
                                        data={categorias}
                                        dataKey='id'
                                        textField='descricao'
                                        onChange={value => setCategoria(value)}
                                    />}
                                </div>
                                <div className={styles.formCreate} onClick={criarCat}>
                                    {novaCat
                                    ? (<button><UndoIcon fontSize="small" sx={{color: '#5581FB'}}/>Desfazer</button>)
                                    : (<button><CreateOutlinedIcon fontSize="small" sx={{color: '#5581FB'}}/>Criar</button>)}
                                </div>
                            </div>
                            {!novaCat && errors.categoria && <span className={styles.formError}>{errors.categoria}</span>}
                        </div>
                    </div>

                    {novaCat && <div className={styles.criarCatCid}>
                        <div className={styles.blocaoTxtBasico}>
                            <label className={styles.formLabel}>Nome da nova categoria</label>
                            <input type="text" className={styles.formTxt} value={nomeCat} onChange={(event) => setNomeCat(event.target.value)}/> 
                            {errors.categoria && <span className={styles.formError}>{errors.categoria}</span>}
                        </div>

                        <div className={styles.addImgCatCid}>
                            <div className={styles.addImgCatCidTxt}>
                                <label className={styles.formLabel} >Imagem da nova categoria</label>
                                <div className={styles.alinhaTxtImg}>
                                    <input type="text" className={styles.alinhaTxtImgTxt} value={urlCat} onChange={(event) => setUrlCat(event.target.value)}/>
                                    <button disabled className={styles.ndBtn} ><FileUploadOutlinedIcon fontSize="small"/>Upload</button>
                                </div>
                                {errors.categoria && <span className={styles.formError}>{errors.categoria}</span>}
                            </div>
                        </div>

                    </div>}

                </div>

                {/*----Endereço----*/}
                <div className={styles.blocoSXZ}>
                    <div className={styles.blocaoTxtBasico}>
                        <label>Endereço</label>
                        <input type="text" placeholder="Ex.: R. Céu Azul, 123 - Arroio da Manteiga" value={endereco} onChange={(event) => setEndereco(event.target.value)}/> 
                        {errors.endereco && <span className={styles.formError}>{errors.endereco}</span>}
                    </div>

                    <div className={styles.formNovaCatCid}>
                        <div className={styles.blocaoTxtCatCid}>
                            {!novaCid && <label className={styles.formLabel}>Cidade</label>}
                            <div className={styles.alinhaComboImg}>
                                <div className={styles.formComboBox}>
                                    {!novaCid && <Combobox
                                        value={cidade}
                                        defaultValue=""
                                        data={cidades}
                                        dataKey='id'
                                        textField='nome'
                                        onChange={value => setCidade(value)}
                                    />}
                                </div>
                                
                                <div className={styles.formCreate} onClick={criarCid}>
                                    {novaCid
                                    ? ( <button><UndoIcon fontSize="small" sx={{color:'#5581FB'}}/>Desfazer</button> ) 
                                    : ( <button><CreateOutlinedIcon fontSize="small" sx={{color:'#5581FB'}}/>Criar</button> )}
                                </div>
                            </div>
                            {!novaCid && errors.cidade && <span className={styles.formError}>{errors.cidade}</span>}
                        </div>
                    </div>

                    {novaCid && <div className={styles.criarCatCid}>
                        <div className={styles.blocaoTxtBasico}>
                            <label className={styles.formLabel}>Nome da nova cidade</label>
                            <input type="text" className={styles.formTxt} value={nomeCid} onChange={(event) => setNomeCid(event.target.value)}/> 
                            {errors.cidade && <span className={styles.formError}>{errors.cidade}</span>}
                        </div>

                        <div className={styles.blocaoTxtBasico}>
                            <label className={styles.formLabel}>País</label>
                            <input type="text" className={styles.formTxt} value={pais} onChange={(event) => setPais(event.target.value)}/> 
                            {errors.cidade && <span className={styles.formError}>{errors.cidade}</span>}
                        </div>

                    </div>}
                    
                </div>

                {/*----Descrição----*/}
                <div className={styles.blocoSXZ}>
                    <div className={styles.formInputs}>
                        <label>Descrição curta</label>
                        <textarea className={styles.formTxtDesc} placeholder="Descreva o local em uma linha..." value={descCurta} onChange={(event) => setDescCurta(event.target.value)}/> 
                        {errors.descCurta && <span className={styles.formError}>{errors.descCurta}</span>}
                    </div>

                    <div className={styles.formInputs}>
                        <label>Descrição longa</label>
                        <textarea className={styles.formTxtDesc} value={descLonga} placeholder="Descreva o local com mais detalhes..." onChange={(event) => setDescLonga(event.target.value)}/> 
                        {errors.descLonga && <span className={styles.formError}>{errors.descLonga}</span>}
                    </div>
                </div>

            </div>
            <div className={styles.divisor}></div>


            {/*---- Comidades ----*/}
                <div className={styles.section}>

                    <h2>Adicionar atributos</h2>

                    {(atributos.length > 0) && <div className={styles.formAtribSalvos}>
                        {atributos.map((item, index) => (
                            <div className={styles.savedItens} key={index}>
                                <p>Atributo salvo:</p>
                                <p>{item.nome}</p>
                                <p>{item.icone}</p>
                                <button className={styles.formRemoveBtn} onClick={() => apagarAtrib(item.nome)}><HighlightOffOutlinedIcon fontSize="small"/></button>
                            </div>
                        ))}
                    </div>}


                    <div className={styles.formInputsContainer}>
                        <div className={styles.formInputs}>
                            <label>Nome da comodidade</label>
                            <input type="text" value={icNome} placeholder="Ex.: Ar condicionado" onChange={(event) => setIcNome(event.target.value)}/> 
                        </div>

                        <div className={styles.formInputs}>
                            <label>Ícone</label>
                            <input type="text" className={styles.formTxt} value={icIcone} onChange={(event) => setIcIcone(event.target.value)}/> 
                        </div>

                        <button className={styles.ndBtn} onClick={addIcone}><AddOutlinedIcon fontSize="small" sx={{color:'#5581FB'}}/>Adicionar</button>
                    </div>


                    


                    {errors.atributos && <span className={styles.formError}>{errors.atributos}</span>}
                    
                </div>

                <div className={styles.divisor}></div>

            {/*---- Políticas ----*/}
                <div className={styles.section}>

                    <h2>Políticas da acomodação</h2>

                    <div className={styles.formInputsContainer}>

                        <div className={styles.formPoliticasBlock}>

                            <h3>Regras da acomodação</h3>

                            <label className={styles.formLabel}>Check-in</label>
                            <Combobox
                                defaultValue=""
                                data={horas}
                                onChange={value => setCheckin(value)}
                            />
                            {errors.checkin && <span className={styles.formError}>{errors.checkin}</span>}
                            
                            <label className={styles.formLabel}>Check-out</label>
                            <Combobox
                                defaultValue=""
                                data={horas}
                                onChange={value => setCheckout(value)}
                            />
                            {errors.checkout && <span className={styles.formError}>{errors.checkout}</span>}
                            
                            <label className={styles.formLabel}>Outras regras</label>
                            <textarea className={styles.formTxtDesc} value={regras} onChange={(event) => setRegras(event.target.value)}/> 
                            {errors.regras && <span className={styles.formError}>{errors.regras}</span>}
                        </div>

                        <div className={styles.formPoliticasBlock}>
                            <h3>Saúde e segurança</h3>
                            <label className={styles.formLabel}>Diretrizes da acomodação</label>
                            <textarea className={styles.formTxtDesc} value={diretrizes} onChange={(event) => setDiretrizes(event.target.value)}/> 
                            {errors.regras && <span className={styles.formError}>{errors.regras}</span>}
                        </div>

                        <div className={styles.formPoliticasBlock}>
                            <h3>Políticas de cancelamento</h3>
                            <label className={styles.formLabel}>Políticas da acomodação</label>
                            <textarea className={styles.formTxtDesc} value={politicas} onChange={(event) => setPoliticas(event.target.value)}/> 
                            {errors.politicas && <span className={styles.formError}>{errors.politicas}</span>}
                        </div>
                    </div>
                </div>

                <div className={styles.divisor}></div>
                

            {/*---- Carregar imagens ----*/}
                <div className={styles.section}>


                    <h2>Carregar imagens</h2>


                    {(imgPrinSalva.length > 0) && <div className={styles.formAtribSalvos}>
                        <div className={styles.savedItens}>
                            <p>Imagem principal salva:</p>
                            <p>{imgPrinSalva}</p>
                            <button className={styles.formRemoveBtn} onClick={() => setImgPrinSalva("")}><HighlightOffOutlinedIcon fontSize="small"/></button>
                        </div>
                    </div>}


                    <div className={styles.formInputsContainer}>
                            
                        <div className={styles.formInputs}>
                            <label>Imagem principal</label>
                            <input type="text" value={imgPrincipal} onChange={(event) => setImgPrincipal(event.target.value)}/> 
                        </div>
                        <button className={styles.ndBtn} disabled><FileUploadOutlinedIcon fontSize="small" sx={{color:'#5581FB'}}/>Upload</button>
                        <button className={styles.ndBtn} onClick={() => addImgPrincipal()}><AddOutlinedIcon fontSize="small" sx={{color:'#5581FB'}}/>Adicionar</button>
                        {errors.imgPrincipal && <span className={styles.formError}>{errors.imgPrincipal}</span>}

                       
                    </div>  


                    {(imagens.length > 0) && <div className={styles.formAtribSalvos}>
                        {imagens.map((item, index) => (
                            <div className={styles.savedItens} key={index}>
                                <p>Imagem salva:</p>
                                <p>{item}</p>
                                <button className={styles.formRemoveBtn} onClick={() => apagarImgLista(item)}><HighlightOffOutlinedIcon fontSize="small"/></button>
                            </div>
                        ))}
                    </div>}

                    <div className={styles.formInputsContainer}>
                        
                        <div className={styles.formInputs}>
                            <label>Outras imagens</label>
                            <input type="text" value={imgSec} onChange={(event) => setImgSec(event.target.value)}/> 
                        </div>

                        <button className={styles.ndBtn} disabled ><FileUploadOutlinedIcon fontSize="small" sx={{color:'#5581FB'}}/>Upload</button>
                        <button className={styles.ndBtn} onClick={() => addImgSec()}><AddOutlinedIcon fontSize="small" sx={{color:'#5581FB'}}/>Adicionar</button>
                        {errors.imagens && <span className={styles.formError}>{errors.imagens}</span>}

                    </div>

                   
                </div>


            {/*---- Save btn ----*/}
                <div className={styles.section}>
                    <button className={styles.formBtn} onClick={cadastrar}><SaveOutlinedIcon fontSize="small" sx={{color:'white'}}/> Salvar acomodação</button>
                </div>

            </div>
        </div>
    
    );
  };
  
  export default FormProd;