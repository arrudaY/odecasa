package com.airbnb.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="usuarios")
public class Usuario implements UserDetails
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
	@Column(nullable = false, unique = true, name = "email")
	private String username;
	
	@Size(min = 8, max = 100)
	@NotBlank
	@NotEmpty
	@Column(nullable = false)
	private String password;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_funcao", referencedColumnName = "id")
	private Funcao funcao;
	
	//Construtores
	
	public Usuario(Long id, String nome, String sobreNome, String username, String password, Funcao funcao)
	{
		this.id = id;
		this.nome = nome;
		this.sobreNome = sobreNome;
		this.username = username;
		this.password = password;
		this.funcao = funcao;
	}
	public Usuario(String nome, String sobreNome, String username, String password, Funcao funcao)
	{
		this.nome = nome;
		this.sobreNome = sobreNome;
		this.username = username;
		this.password = password;
		this.funcao = funcao;
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
	public Funcao getFuncao()
	{
		return funcao;
	}
	public void setFuncao(Funcao funcao)
	{
		this.funcao = funcao;
	}
	@Override
	public String getUsername()
	{
		return username;
	}
	@Override
	public boolean isAccountNonExpired()
	{
		return true;
	}
	@Override
	public boolean isAccountNonLocked()
	{
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired()
	{
		return true;
	}
	@Override
	public boolean isEnabled()
	{
		return true;
	}
	public void setUsername(String username)
	{
		this.username = username;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities()
	{
		return Arrays.asList(this.getFuncao());
	}
	@Override
	public String getPassword()
	{
		return password;
	}
	public void setPassword(String password)
	{
		this.password = password;
	}
	
}
