package com.airbnb.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;

@Entity
@Table(name="funcoes")
public class Funcao
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(length = 100)
	private String nome;
	
	//Construtores
	public Funcao(){}
	public Funcao(long id, String nome, Usuario usuario)
	{
		this.id = id;
		this.nome = nome;
	}
	public Funcao(String nome, Usuario usuario)
	{
		this.nome = nome;
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
	public String getNome()
	{
		return nome;
	}
	public void setNome(String nome)
	{
		this.nome = nome;
	}

	
}
