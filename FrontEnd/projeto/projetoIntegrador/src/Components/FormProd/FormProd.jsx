import styles from "./FormProd.module.css";
import { useContext, useState } from "react";
import { FormContext } from "../../Contexts/FormContext";
import imgVoltar from "../../Data/back.png"
import { useNavigate } from "react-router-dom";
import addImg from "../../Data/add.png"
import removeImg from "../../Data/remove.png"
import uploadImg from "../../Data/upload.png"
import apagarImg from "../../Data/erro.png"
import Combobox from "react-widgets/Combobox";


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
    
    const { categorias, setCategorias, cidades, setCidades, isLoading, setIsLoading, produto, setProduto } = useContext(FormContext);
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
            setProduto({
                nome: nome,
                descricao: descLonga,
                qualificacao: 5.0,
                titulo: descCurta,
                imagemList: aux,
                categoria: categoria,
                cidade: cidade,
                caracteristicaList: atributos,
                
            });

            //cadastrarAPI();
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
            <p>Administração</p>
            <img onClick={voltar} className={styles.formVoltar} src={imgVoltar}></img>
        </div>
        <div className={styles.formFundo}>
            <div className={styles.formContainer2}>
                <h2>Criar nova acomodação</h2>
                <div className={styles.formBlocao}>
                    <div className={styles.blocaoTxtBasico}>
                        <label className={styles.formLabel}>Nome da Acomodação</label>
                        <input type="text" className={styles.formTxt} value={nome} onChange={(event) => setNome(event.target.value)}/> 
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
                                <img className={styles.formAddImg} src={novaCat ? removeImg : addImg} onClick={criarCat}></img>
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
                                <label className={styles.formLabel}>Imagem da nova categoria</label>
                                <div className={styles.alinhaTxtImg}>
                                    <input type="text" className={styles.alinhaTxtImgTxt} value={urlCat} onChange={(event) => setUrlCat(event.target.value)}/>
                                    <img className={styles.formUploadImg} src={uploadImg}></img>
                                </div>
                                {errors.categoria && <span className={styles.formError}>{errors.categoria}</span>}
                            </div>
                        </div>
                    </div>}
                    <div className={styles.blocaoTxtBasico}>
                        <label className={styles.formLabel}>Endereço</label>
                        <input type="text" className={styles.formTxt} value={endereco} onChange={(event) => setEndereco(event.target.value)}/> 
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
                                <img className={styles.formAddImg} src={novaCid ? removeImg : addImg} onClick={criarCid}></img>
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
                    <div className={styles.blocaoTxtBasicoDesc}>
                        <label className={styles.formLabel}>Descrição curta</label>
                        <textarea className={styles.formTxtDesc} value={descCurta} onChange={(event) => setDescCurta(event.target.value)}/> 
                        {errors.descCurta && <span className={styles.formError}>{errors.descCurta}</span>}
                    </div>
                    <div className={styles.blocaoTxtBasicoDesc}>
                        <label className={styles.formLabel}>Descrição longa</label>
                        <textarea className={styles.formTxtDesc} value={descLonga} onChange={(event) => setDescLonga(event.target.value)}/> 
                        {errors.descLonga && <span className={styles.formError}>{errors.descLonga}</span>}
                    </div>
                    <h3>Adicionar atributos</h3>
                    <div className={styles.formAtributos}>
                        {(atributos.length > 0) && <div className={styles.formAtribSalvos}>
                            {atributos.map((item, index) => (
                                <div className={styles.atributoSalvo} key={index}>
                                    <p>Ícone salvo:</p>
                                    <p>{item.nome}</p>
                                    <p>{item.icone}</p>
                                    <img className={styles.formApagarImg} src={apagarImg} onClick={() => apagarAtrib(item.nome)}></img>
                                </div>
                            ))}
                        </div>}
                        <div className={styles.formAtributosTxts}>
                            <div className={styles.formTxtAtributos}>
                                <label className={styles.formLabel}>Nome</label>
                                <input type="text" className={styles.formTxt} value={icNome} onChange={(event) => setIcNome(event.target.value)}/> 
                            </div>
                            <div className={styles.formTxtAtributos}>
                                <label className={styles.formLabel}>Ícone</label>
                                <input type="text" className={styles.formTxt} value={icIcone} onChange={(event) => setIcIcone(event.target.value)}/> 
                            </div>
                        </div>
                        <img className={styles.formAddImg} src={addImg} onClick={addIcone}></img>
                    </div>
                    {errors.atributos && <span className={styles.formError}>{errors.atributos}</span>}
                    <h3>Políticas da Acomodação</h3>
                    <div className={styles.formPoliticas}>
                        <div className={styles.formPoliticasBloco}>
                            <h5>Regras da acomodação</h5>
                            <label className={styles.formLabel}>Checkin</label>
                            <Combobox
                                defaultValue=""
                                data={horas}
                                onChange={value => setCheckin(value)}
                            />
                            {errors.checkin && <span className={styles.formError}>{errors.checkin}</span>}
                            <label className={styles.formLabel}>Checkout</label>
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
                        <div className={styles.formPoliticasBloco}>
                            <h5>Saúde e Segurança</h5>
                            <label className={styles.formLabel}>Diretrizes da acomodação</label>
                            <textarea className={styles.formTxtDesc} value={diretrizes} onChange={(event) => setDiretrizes(event.target.value)}/> 
                            {errors.regras && <span className={styles.formError}>{errors.regras}</span>}
                        </div>
                        <div className={styles.formPoliticasBloco}>
                            <h5>Políticas de Cancelamento</h5>
                            <label className={styles.formLabel}>Políticas da acomodação</label>
                            <textarea className={styles.formTxtDesc} value={politicas} onChange={(event) => setPoliticas(event.target.value)}/> 
                            {errors.politicas && <span className={styles.formError}>{errors.politicas}</span>}
                        </div>
                    </div>
                    <h3>Carregar Imagens</h3>
                    <div className={styles.formAtributos}>
                        {(imgPrinSalva.length > 0) && <div className={styles.formAtribSalvos}>
                            <div className={styles.atributoSalvo}>
                                <p>Imagem principal salva:</p>
                                <p>{imgPrinSalva}</p>
                                <img className={styles.formApagarImg} src={apagarImg} onClick={() => setImgPrinSalva("")}></img>
                            </div>
                        </div>}
                        <h5>Imagem Principal</h5>
                        <div className={styles.formCarregarImg}>
                            <input type="text" className={styles.formCarregarImgTxt} value={imgPrincipal} onChange={(event) => setImgPrincipal(event.target.value)}/> 
                            <img className={styles.formUploadImg} src={uploadImg}></img>
                            <img className={styles.formAddImg} src={addImg} onClick={() => addImgPrincipal()}></img>
                            {errors.imgPrincipal && <span className={styles.formError}>{errors.imgPrincipal}</span>}
                        </div>
                        {(imagens.length > 0) && <div className={styles.formAtribSalvos}>
                            {imagens.map((item, index) => (
                                <div className={styles.atributoSalvo} key={index}>
                                    <p>Imagem salva:</p>
                                    <p>{item}</p>
                                    <img className={styles.formApagarImg} src={apagarImg} onClick={() => apagarImgLista(item)}></img>
                                </div>
                            ))}
                        </div>}
                        <h5>Outras imagens</h5>
                        <div className={styles.formCarregarImg}>
                            <input type="text" className={styles.formCarregarImgTxt} value={imgSec} onChange={(event) => setImgSec(event.target.value)}/> 
                            <img className={styles.formUploadImg} src={uploadImg}></img>
                            <img className={styles.formAddImg} src={addImg} onClick={() => addImgSec()}></img>
                            {errors.imagens && <span className={styles.formError}>{errors.imagens}</span>}
                        </div>
                    </div>
                    <div className={styles.formCentralizaBtn}>
                        <button className={styles.formBtn} onClick={cadastrar}>Criar Acomodação</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default FormProd;