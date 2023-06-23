package com.airbnb.model;

import jakarta.persistence.*;

@Entity
@Table(name="endereco")
public class Endereco
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String endereco;
	private String latitude;
	private String longitude;
	
	public Endereco(long id, String endereco, String latitude, String longitude)
	{
		this.id = id;
		this.endereco = endereco;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	public Endereco(String endereco, String latitude, String longitude)
	{
		this.endereco = endereco;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	public Endereco(){}
	
	public long getId()
	{
		return id;
	}
	public void setId(long id)
	{
		this.id = id;
	}
	public String getEndereco()
	{
		return endereco;
	}
	public void setEndereco(String endereco)
	{
		this.endereco = endereco;
	}
	public String getLatitude()
	{
		return latitude;
	}
	public void setLatitude(String latitude)
	{
		this.latitude = latitude;
	}
	public String getLongitude()
	{
		return longitude;
	}
	public void setLongitude(String longitude)
	{
		this.longitude = longitude;
	}
	
}
