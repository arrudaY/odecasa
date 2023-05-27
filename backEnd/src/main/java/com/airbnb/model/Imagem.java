//package com.airbnb.model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.hibernate.validator.constraints.Length;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "imagens")
//public class Imagem
//{
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private long id;
//
//	@Length(max=50)
//	private String titulo;
//
//	@Length(max=255)
//	private String url;
//
//	@ManyToOne
//	@JoinColumn(name="id")
//	private Produto produto;
//}
