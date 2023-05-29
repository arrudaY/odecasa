package com.airbnb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
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
}