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
public class Produto
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Length(max=50)
	private String nome;

	@Length(max=255)
	private String descricao;


	//Um produto, pode ter várias imagems. Mapeado pelo atributo 'produto' colocado na classe Imagem. O cascade salva
	// todos os itens filhos.
	@OneToMany(mappedBy ="produto", cascade = CascadeType.ALL)
	private List<Imagem> imagemList;

	//Muitos produtos para uma categoria, o join indica a coluna que recebe a chave estrangeira  da categoria
	@ManyToOne()
	@JoinColumn(name = "id_categoria")
	private Categoria categoria;
	
	//Muitos produtos para uma cidade, o join indica a coluna que recebe a chave estrangeira da cidade
	@ManyToOne()
	@JoinColumn(name = "id_cidade")
	private Cidade cidade;
}
