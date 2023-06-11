package com.airbnb.controller;

import com.airbnb.model.Usuario;
import com.airbnb.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/usuario")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioController
{
	@Autowired
	UsuarioService usuarioService;
	
	@GetMapping
	public ResponseEntity buscarTodosUsuarios()
	{
		List<Usuario> usuariosList = usuarioService.buscarTodosUsuarios();
		return new ResponseEntity(usuariosList, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity cadastrarNovoUsuario(@RequestBody @Valid Usuario usuario)
	{
		usuario = usuarioService.cadastrarUsuario(usuario);
		if(usuario.getId()<0)
			return new ResponseEntity("Usuário não foi criado. Revise as informações ou consulte documentação.",HttpStatus.BAD_REQUEST);
		return new ResponseEntity(usuario, HttpStatus.CREATED);
		
	}
}
