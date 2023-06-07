package com.airbnb.config.security;

import com.airbnb.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig
{
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
	{
		//Configs
		http
				.httpBasic()
				.and()
				.authorizeHttpRequests()                            //autorizações de requisições
				.requestMatchers("/categoria").permitAll() //requisições nesse endpoint, todas permitidas
				.anyRequest().authenticated()                       //qualquer outra requisição, requer autenticação
				.and()
				.csrf().disable();                                  //Enabled por padrão. Não permite post or delete, por isso desativado.
		
		return http.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
}
