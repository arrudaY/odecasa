package com.airbnb.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class UserAuthDTO
{
	@Size(min = 11, max = 100)
	@NotNull
	@NotEmpty
	@NotBlank
	private String username;

	@Size(min = 8, max = 100)
	@NotNull
	@NotEmpty
	@NotBlank
	private String password;
	
	public UserAuthDTO(String username, String password)
	{
		this.username = username;
		this.password = password;
	}
	
	public UsernamePasswordAuthenticationToken converter()
	{
		return new UsernamePasswordAuthenticationToken(this.username, this.password);
	}
	
	public String getUsername()
	{
		return username;
	}
	public void setUsername(String username)
	{
		this.username = username;
	}
	public String getPassword()
	{
		return password;
	}
	public void setPassword(String password)
	{
		this.password = password;
	}
	
}
