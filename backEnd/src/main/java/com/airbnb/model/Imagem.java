package com.airbnb.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "imagens")
public class Imagem
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Length(max=50)
	private String titulo;
	
	@Length(max=255)
	private String url;

	//Lado bidirecional com relação ao produto.
	@ManyToOne(cascade = CascadeType.ALL)
	@JsonIgnore                              //Rapaz... Isso é pra evitar o erro de recursão ao tentar setar o produto recebido à imagem que vai se criada.
	@JoinColumn(name="produto_id")           //Nome da coluna que é criada para receber a FK do produto.
	private Produto produto;
	
	//Construtor
	public Imagem()
	{}
	
	public Imagem(long id, String titulo, String url, Produto produto)
	{
		this.id = id;
		this.titulo = titulo;
		this.url = url;
		this.produto = produto;
	}
	
	
	public void addProduto(Produto produto)
	{
		this.produto = produto;
	}
	
	//Getters N Setters
	public long getId()
	{
		return id;
	}
	public void setId(long id)
	{
		this.id = id;
	}
	public String getTitulo()
	{
		return titulo;
	}
	public void setTitulo(String titulo)
	{
		this.titulo = titulo;
	}
	public String getUrl()
	{
		return url;
	}
	public void setUrl(String url)
	{
		this.url = url;
	}
	public Produto getProduto()
	{
		return produto;
	}
	public void setProduto(Produto produto)
	{
		this.produto = produto;
	}
	
}
