package com.airbnb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "caracteristicas")
public class Caracteristica {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String nome;
	private String icone;
	
	@ManyToMany(mappedBy = "caracteristicaList", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Produto> produtoList = new ArrayList<Produto>();
	
	public void addProduto(Produto produto)
	{
		this.produtoList.add(produto);
	}
	
	//Construtor
	public Caracteristica(){}
	
	//Getters N Setters
	public long getId()
	{
		return id;
	}
	public void setId(long id)
	{
		this.id = id;
	}
	public String getNome()
	{
		return nome;
	}
	public void setNome(String nome)
	{
		this.nome = nome;
	}
	public String getIcone()
	{
		return icone;
	}
	public void setIcone(String icone)
	{
		this.icone = icone;
	}
	public List<Produto> getProdutoList()
	{
		return produtoList;
	}
	public void setProdutoList(List<Produto> produtoList)
	{
		this.produtoList = produtoList;
	}
	
}