package com.airbnb.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name="usuarios")
public class Usuario
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 100)
	private String nome;
	@Column(length = 100)
	private String sobreNome;
	
	@Size(min = 11, max = 100)
	@NotBlank
	@NotEmpty
	private String email;
	
	@Size(min = 8, max = 100)
	@NotBlank
	@NotEmpty
	private String password;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_funcao", referencedColumnName = "id")
	private Funcao funcao;
	
	//Construtores
	public Usuario(Long id, String nome, String sobreNome, String email, String password)
	{
		this.id = id;
		this.nome = nome;
		this.sobreNome = sobreNome;
		this.email = email;
		this.password = password;
	}
	public Usuario(String nome, String sobreNome, String email, String password)
	{
		this.nome = nome;
		this.sobreNome = sobreNome;
		this.email = email;
		this.password = password;
	}
	public Usuario()
	{}
	
	//Getters N Setters
	public void setId(Long id)
	{
		this.id = id;
	}
	public Long getId()
	{
		return id;
	}
	public String getNome()
	{
		return nome;
	}
	public void setNome(String nome)
	{
		this.nome = nome;
	}
	public String getSobreNome()
	{
		return sobreNome;
	}
	public void setSobreNome(String sobreNome)
	{
		this.sobreNome = sobreNome;
	}
	public String getEmail()
	{
		return email;
	}
	public void setEmail(String email)
	{
		this.email = email;
	}
	public String getPassword()
	{
		return password;
	}
	public void setPassword(String password)
	{
		this.password = password;
	}
	public Funcao getFuncao()
	{
		return funcao;
	}
	public void setFuncao(Funcao funcao)
	{
		this.funcao = funcao;
	}
	
}
