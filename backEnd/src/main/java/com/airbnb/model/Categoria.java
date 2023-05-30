package com.airbnb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
public class Categoria
{
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private long id;
	
	private String descricao, urlImagem;
	
	public Categoria(String descricao, String urlImagem)
	{
		this.descricao = descricao;
		this.urlImagem = urlImagem;
	}
	
	//Construtor
	public Categoria(){}
	
	//Getters N Setters
	public long getId()
	{
		return id;
	}
	public void setId(long id)
	{
		this.id = id;
	}
	public String getDescricao()
	{
		return descricao;
	}
	public void setDescricao(String descricao)
	{
		this.descricao = descricao;
	}
	public String getUrlImagem()
	{
		return urlImagem;
	}
	public void setUrlImagem(String urlImagem)
	{
		this.urlImagem = urlImagem;
	}
	
}
