package com.airbnb.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "cidades")
public class Cidade
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Length(max = 50)
	private String nome;
	
	@Length(max = 50)
	private String pais;
	
	//Construtor
	public Cidade(){}
	
	//Getters N Setters.
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
	public String getPais()
	{
		return pais;
	}
	public void setPais(String pais)
	{
		this.pais = pais;
	}
	
}
