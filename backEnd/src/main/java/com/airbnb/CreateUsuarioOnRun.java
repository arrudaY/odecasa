package com.airbnb;

import com.airbnb.model.Funcao;
import com.airbnb.model.Usuario;
import com.airbnb.repository.UsuarioRepository;
import com.airbnb.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//Classe para criação de um usuário de modo automático. Posso usar isso para popular o banco
@Configuration
public class CreateUsuarioOnRun implements ApplicationRunner
{
	@Autowired
	UsuarioService usuarioService;
	
	@Override
	public void run(ApplicationArguments args) throws Exception
	{
		Usuario admin = new Usuario("Vitor"
				, "Mateus"
				, "a@gmail.com"
				, new BCryptPasswordEncoder().encode("senha123")
				, new Funcao("ROLE_ADMIN"));
		Usuario user = new Usuario("Mateus"
				, "Vitor"
				, "b@gmail.com"
				, new BCryptPasswordEncoder().encode("senha123")
				, new Funcao("ROLE_USER"));
		System.out.println("ADMIN:" + usuarioService.cadastrarUsuario(admin).getId());
		System.out.println("USER :" + usuarioService.cadastrarUsuario(user).getId());
	}
}
