package com.airbnb.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig
{
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception
	{
		return configuration.getAuthenticationManager();
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.csrf(csrf -> csrf.disable())
		           .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		           .build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
//	{
//		//Configs
////		http
////				.httpBasic()
////				.and()
////				.authorizeHttpRequests()                            //autorizações de requisições
////				.requestMatchers(HttpMethod.GET, "/categoria/**", "/cidade/**", "/produto/**", "/auth/**").permitAll() //requisições nesse endpoint, todas permitidas
////				.requestMatchers(HttpMethod.POST, "/usuario", "/auth").permitAll()
////				.requestMatchers(HttpMethod.DELETE, "/cidade", "/categoria").hasRole("ADMIN")
////				.requestMatchers(HttpMethod.POST, "/categoria", "/cidade").hasRole("ADMIN")
////				.requestMatchers(HttpMethod.PATCH, "/categoria").hasRole("ADMIN")
////				.requestMatchers(HttpMethod.GET, "/usuario").hasRole("ADMIN")
////				.requestMatchers(HttpMethod.POST, "/produto").hasRole("USER")
////				.anyRequest().authenticated()                       //qualquer outra requisição, requer autenticação
////				.and()
////				.csrf().disable();                                  //Enabled por padrão. Não permite post or delete, por isso desativado.
//
//		return http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().build();
//	}
}
