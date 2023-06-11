package com.airbnb.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name="funcoes")
public class Funcao implements GrantedAuthority
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(length = 100, nullable = false)
	private String nome;
	
	//Construtores
	public Funcao(){}
	public Funcao(long id, String nome)
	{
		this.id = id;
		this.nome = nome;
	}
	public Funcao(String nome)
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
	
	@Override
	public String getAuthority()
	{
		return this.getNome();
	}
	
}
