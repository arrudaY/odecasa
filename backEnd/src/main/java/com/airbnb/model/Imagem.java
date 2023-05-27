package com.airbnb.model;
import com.airbnb.model.Produto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "imagens")
public class Imagem
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Length(max=50)
	private String titulo;
	
	@Length(max=255)
	private String url;

	//Lado bidirecional com relação ao produto.
	@ManyToOne(cascade = CascadeType.ALL)
	@JsonIgnore                              //Rapaz... Isso é pra evitar o erro de recursão ao tentar setar o produto recebido à imagem que vai se criada.
	@JoinColumn(name="produto_id")           //Nome da coluna que é criada para receber a FK do produto.
	private Produto produto;
	
	public void addProduto(Produto produto)
	{
		this.produto = produto;
	}
}
