package com.airbnb.model;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "politicas")
public class Politicas
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Length(max=255)
	@Column(name = "normas_da_casa")
	private String normasDaCasa;
	
	@Length(max=255)
	@Column(name = "saude_e_seguranca")
	private String saudeESeguranca;
	
	@Length(max=255)
	@Column(name = "politicas_de_cancelamento")
	private String politicasDeCancelamento;
	
	public Politicas(String normasDaCasa, String saudeESeguranca, String politicasDeCancelamento)
	{
		this.normasDaCasa = normasDaCasa;
		this.saudeESeguranca = saudeESeguranca;
		this.politicasDeCancelamento = politicasDeCancelamento;
	}
	public Politicas(Long id, String normasDaCasa, String saudeESeguranca, String politicasDeCancelamento)
	{
		this.id = id;
		this.normasDaCasa = normasDaCasa;
		this.saudeESeguranca = saudeESeguranca;
		this.politicasDeCancelamento = politicasDeCancelamento;
	}
	public Politicas(){}
	
	public String getNormasDaCasa()
	{
		return normasDaCasa;
	}
	public void setNormasDaCasa(String normasDaCasa)
	{
		this.normasDaCasa = normasDaCasa;
	}
	public String getSaudeESeguranca()
	{
		return saudeESeguranca;
	}
	public void setSaudeESeguranca(String saudeESeguranca)
	{
		this.saudeESeguranca = saudeESeguranca;
	}
	public String getPoliticasDeCancelamento()
	{
		return politicasDeCancelamento;
	}
	public void setPoliticasDeCancelamento(String politicasDeCancelamento)
	{
		this.politicasDeCancelamento = politicasDeCancelamento;
	}
	public void setId(Long id)
	{
		this.id = id;
	}
	public Long getId()
	{
		return id;
	}
	
}
