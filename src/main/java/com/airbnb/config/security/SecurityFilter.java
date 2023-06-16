package com.airbnb.config.security;

import com.airbnb.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.LogManager;
import java.util.logging.Logger;

@Component
public class SecurityFilter extends OncePerRequestFilter
{
	@Autowired
	private UsuarioRepository usuarioRepository;
	@Autowired
	private TokenService tokenService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException
	{
		//Lógica para recuperar o Token e fazer a validação
		var tokenJWT = recuperarToken(request);
		//só faço a chamada do método para buscar o subject, caso tenha header
		if(tokenJWT != null)
		{
			//faz a validação do token e retorna o subject informado na assintura do JWT
			var subject = tokenService.getSubject(tokenJWT);
			//busco o subject informado no banco e trago
			var usuario = usuarioRepository.findByUsername(subject);
			//Força a autenticação para esse usuário
			var authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.get().getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		//Garante que o próximo filtro seja chamado. Caso tenha sucesso no filtro atual, deve chamar
		//para dar sequencia na aplicação.
		filterChain.doFilter(request, response);
	}

	private String recuperarToken(HttpServletRequest request)
	{
		//Busco o header de "Authorization"
		var authorizationHeader = request.getHeader("Authorization");

		//Se tiver esse header, retorno retorno o código, senão, retorno nulo.
		if (authorizationHeader != null)
		{
			System.out.println(authorizationHeader);
			return authorizationHeader.replace("Bearer ", "");
		}
		return null;
	}

}