package com.airbnb.service;

import com.airbnb.model.Funcao;
import com.airbnb.model.Usuario;
import com.airbnb.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService
{
	UsuarioRepository usuarioRepository;
	
	@Autowired
	public UsuarioService(UsuarioRepository usuarioRepository){this.usuarioRepository=usuarioRepository;}
	
	public Usuario cadastrarUsuario(Usuario usuario)
	{
		return usuarioRepository.save(usuario);
	}
	
	public List<Usuario> buscarTodosUsuarios()
	{
		return usuarioRepository.findAll();
	}
}
