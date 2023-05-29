package com.airbnb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "produtos")
public class Produto {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Length(max=50)
	private String nome;
	
	@Length(max=255)
	private String descricao;
	
	@OneToMany(mappedBy = "produto", cascade = CascadeType.ALL)
	private List<Imagem> imagemList;
	
	@ManyToOne()
	@JoinColumn(name = "id_categoria")
	private Categoria categoria;
	
	@ManyToOne()
	@JoinColumn(name = "id_cidade")
	private Cidade cidade;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "caracteristica_produto",
			joinColumns = @JoinColumn(name = "id_produto"),
			inverseJoinColumns = @JoinColumn(name = "id_caracteristica")
	)
	private List<Caracteristica> caracteristicaList;
}