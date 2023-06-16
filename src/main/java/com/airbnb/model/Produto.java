package com.airbnb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.ArrayList;
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
	
	//Construtores
	public Produto(){}
	
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

}