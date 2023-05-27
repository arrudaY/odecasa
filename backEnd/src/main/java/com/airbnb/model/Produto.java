//package com.airbnb.model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.hibernate.validator.constraints.Length;
//
//import java.util.List;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "produtos")
//public class Produto
//{
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private long id;
//
//	@Length(max=50)
//	private String nome;
//
//	@Length(max=255)
//	private String descricao;
//
//	@OneToMany(mappedBy = "produto")
//	private List<Imagem> imagemList;
//}
