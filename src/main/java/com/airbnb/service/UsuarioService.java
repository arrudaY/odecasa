package com.airbnb.service;

import com.airbnb.model.Usuario;
import com.airbnb.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService implements UserDetailsService
{
	UsuarioRepository usuarioRepository;
	
	@Autowired
	public UsuarioService(UsuarioRepository usuarioRepository){this.usuarioRepository=usuarioRepository;}
	
	public Usuario cadastrarUsuario(Usuario usuario)
	{
		if(usuarioRepository.findByUsername(usuario.getUsername()).isEmpty())
		{
			usuario.setPassword(new BCryptPasswordEncoder().encode(usuario.getPassword()));
			return usuarioRepository.save(usuario);
		}
		return usuario;
	}
	
	public List<Usuario> buscarTodosUsuarios()
	{
		return usuarioRepository.findAll();
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
	{
		Usuario userModel = usuarioRepository.findByUsername(username)
		                                     .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
		
		return new User(userModel.getUsername(), userModel.getPassword(), userModel.isEnabled(), userModel.isAccountNonExpired(),
				userModel.isCredentialsNonExpired(), userModel.isAccountNonLocked(), userModel.getAuthorities());
	}
}