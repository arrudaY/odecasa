package com.airbnb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Categoria
{
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private long id;
	
	private double qualificacao;
	
	private String descricao, urlImagem;
	
	public Categoria(double qualificacao, String descricao, String urlImagem)
	{
		this.qualificacao = qualificacao;
		this.descricao = descricao;
		this.urlImagem = urlImagem;
	}

}
