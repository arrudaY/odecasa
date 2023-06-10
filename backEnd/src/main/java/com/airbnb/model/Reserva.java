package com.airbnb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Calendar;

//@Entity
//@Table(name = "reservas")
public class Reserva
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private Calendar dataInicial;
	
	private Calendar dataFinal;
	
	@ManyToOne()
	@JsonIgnore
	@JoinColumn(name="produto_id")
	private Produto produto;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	@JoinColumn(name="usuario_id")
	private Usuario usuario;
}
