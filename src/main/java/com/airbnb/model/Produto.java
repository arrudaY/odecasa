package com.airbnb.model;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.Length;
import java.util.List;

@Entity
@Table(name = "produtos")
public class Produto {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Length(max=50)
	private String nome;
	
	@Length(max=255)
	private String titulo;
	
	@Length(max=500)
	private String descricao;
	
	@Column
	private double qualificacao;
	
	@OneToMany(mappedBy = "produto", cascade = CascadeType.ALL)
	private List<Imagem> imagemList;
	
	@ManyToOne()
	@JoinColumn(name = "id_categoria")
	private Categoria categoria;
	
	@ManyToOne()
	@JoinColumn(name = "id_cidade")
	private Cidade cidade;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "caracteristica_produto",
			joinColumns = @JoinColumn(name = "id_produto"),
			inverseJoinColumns = @JoinColumn(name = "id_caracteristica")
	)
	private List<Caracteristica> caracteristicaList;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_politicas", referencedColumnName = "id")
	private Politicas politicas;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_endereco", referencedColumnName = "id")
	private Endereco endereco;
	
	//Construtores
	public Produto(){}
	public Produto(String nome, String titulo, String descricao, double qualificacao, List<Imagem> imagemList, Categoria categoria, Cidade cidade,
			List<Caracteristica> caracteristicaList, Politicas politicas, Endereco endereco)
	{
		this.nome = nome;
		this.titulo = titulo;
		this.descricao = descricao;
		this.qualificacao = qualificacao;
		this.imagemList = imagemList;
		this.categoria = categoria;
		this.cidade = cidade;
		this.caracteristicaList = caracteristicaList;
		this.politicas = politicas;
	}
	public Produto(long id, String nome, String titulo, String descricao, double qualificacao, List<Imagem> imagemList, Categoria categoria,
			Cidade cidade, List<Caracteristica> caracteristicaList, Politicas politicas, Endereco endereco)
	{
		this.id = id;
		this.nome = nome;
		this.titulo = titulo;
		this.descricao = descricao;
		this.qualificacao = qualificacao;
		this.imagemList = imagemList;
		this.categoria = categoria;
		this.cidade = cidade;
		this.caracteristicaList = caracteristicaList;
		this.politicas = politicas;
	}
	
	//Getters e Setters.
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
	public double getQualificacao()
	{
		return qualificacao;
	}
	public void setQualificacao(double qualificacao)
	{
		this.qualificacao = qualificacao;
	}
	public String getNome()
	{
		return nome;
	}
	public void setNome(String nome)
	{
		this.nome = nome;
	}
	public String getDescricao()
	{
		return descricao;
	}
	public void setDescricao(String descricao)
	{
		this.descricao = descricao;
	}
	public List<Imagem> getImagemList()
	{
		return imagemList;
	}
	public void setImagemList(List<Imagem> imagemList)
	{
		this.imagemList = imagemList;
	}
	public Categoria getCategoria()
	{
		return categoria;
	}
	public void setCategoria(Categoria categoria)
	{
		this.categoria = categoria;
	}
	public Cidade getCidade()
	{
		return cidade;
	}
	public void setCidade(Cidade cidade)
	{
		this.cidade = cidade;
	}
	public List<Caracteristica> getCaracteristicaList()
	{
		return caracteristicaList;
	}
	public void setCaracteristicaList(List<Caracteristica> caracteristicaList)
	{
		this.caracteristicaList = caracteristicaList;
	}
	public Politicas getPoliticas()
	{
		return politicas;
	}
	public void setPoliticas(Politicas politicas)
	{
		this.politicas = politicas;
	}
	public Endereco getEndereco()
	{
		return endereco;
	}
	public void setEndereco(Endereco endereco)
	{
		this.endereco = endereco;
	}
	
}