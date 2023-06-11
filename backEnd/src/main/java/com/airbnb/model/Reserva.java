package com.airbnb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
public class Reserva
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private LocalDateTime dataInicial;
	
	private LocalDateTime dataFinal;
	
	@ManyToOne()
//	@JsonIgnore
	@JoinColumn(name="produto_id")
//	@NotNull
	private Produto produto;
	
	@ManyToOne()
//	@JsonIgnore
	@JoinColumn(name="usuario_id")
//	@NotNull
	private Usuario usuario;
	
	public Reserva(long id, LocalDateTime dataInicial, LocalDateTime dataFinal, Produto produto, Usuario usuario)
	{
		this.id = id;
		this.dataInicial = dataInicial;
		this.dataFinal = dataFinal;
		this.produto = produto;
		this.usuario = usuario;
	}
	public Reserva(LocalDateTime dataInicial, LocalDateTime dataFinal, Produto produto, Usuario usuario)
	{
		this.dataInicial = dataInicial;
		this.dataFinal = dataFinal;
		this.produto = produto;
		this.usuario = usuario;
	}
	public Reserva(){}
	
	public long getId()
	{
		return id;
	}
	public void setId(long id)
	{
		this.id = id;
	}
	public LocalDateTime getDataInicial()
	{
		return dataInicial;
	}
	public void setDataInicial(LocalDateTime dataInicial)
	{
		this.dataInicial = dataInicial;
	}
	public LocalDateTime getDataFinal()
	{
		return dataFinal;
	}
	public void setDataFinal(LocalDateTime dataFinal)
	{
		this.dataFinal = dataFinal;
	}
	public Produto getProduto()
	{
		return produto;
	}
	public void setProduto(Produto produto)
	{
		this.produto = produto;
	}
	public Usuario getUsuario()
	{
		return usuario;
	}
	public void setUsuario(Usuario usuario)
	{
		this.usuario = usuario;
	}
	
}
