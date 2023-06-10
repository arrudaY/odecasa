package com.airbnb.controller;

import com.airbnb.config.security.TokenService;
import com.airbnb.model.UserAuthDTO;
import com.airbnb.model.Usuario;
import com.airbnb.model.tokenDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(value = "/auth")
public class AuthController
{
	@Autowired
	private AuthenticationManager manager;
	
	@Autowired
	private TokenService tokenService;
	
	//se o login falhar, dá 403
	@PostMapping
	public ResponseEntity autenticar(@RequestBody @Valid UserAuthDTO usuarioAuthDTO)
	{
		var token = new UsernamePasswordAuthenticationToken(usuarioAuthDTO.getUsername(), usuarioAuthDTO.getPassword());
		var authentication = manager.authenticate(token);
		
		var responseToken= tokenService.gerarToken(usuarioAuthDTO);
		
		
		return ResponseEntity.ok(new tokenDTO(responseToken));
	}
}
