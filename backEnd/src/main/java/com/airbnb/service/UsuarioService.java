package com.airbnb.service;

import com.airbnb.model.Funcao;
import com.airbnb.model.Usuario;
import com.airbnb.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService
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
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
	{
		Usuario userModel = usuarioRepository.findByUsername(username)
		                                     .orElseThrow(()-> new UsernameNotFoundException("Usuário não encontrado: "+ username));
		return userModel;
	}
	
}
