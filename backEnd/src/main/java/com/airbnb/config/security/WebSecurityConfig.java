package com.airbnb.config.security;

import jakarta.servlet.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig
{
	@Autowired
	private Filter securityFilter;
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception
	{
		return configuration.getAuthenticationManager();
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
	{
		return http.csrf()
		           .disable()
		           .sessionManagement()
		           .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		           .and()
		           .authorizeHttpRequests()
		           .requestMatchers(HttpMethod.POST, "/auth")
		           .permitAll()
		           .requestMatchers(HttpMethod.GET, "/cidade/**", "/categoria/**", "/produto/**")
		           .permitAll()
		           .requestMatchers(HttpMethod.POST, "/usuario")
		           .permitAll()
		           .anyRequest().authenticated()
		           .and()
			       .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)//troca a ordem do filtro para autenticar antes do
			       // filtro do spring(verifica se tá autenticado, mas o nosso filtro é que autentica, então nunca deixaria passar)
		           .build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
}

//Exemplo de autorizações com papéis.

//.authorizeHttpRequests()                            //autorizações de requisições
//.requestMatchers(HttpMethod.GET, "/categoria/**", "/cidade/**", "/produto/**", "/auth/**").permitAll() //requisições nesse endpoint, todas permitidas
//.requestMatchers(HttpMethod.POST, "/usuario", "/auth").permitAll()
//.requestMatchers(HttpMethod.DELETE, "/cidade", "/categoria").hasRole("ADMIN")
//.requestMatchers(HttpMethod.POST, "/categoria", "/cidade").hasRole("ADMIN")
//.requestMatchers(HttpMethod.PATCH, "/categoria").hasRole("ADMIN")
//.requestMatchers(HttpMethod.GET, "/usuario").hasRole("ADMIN")
//.requestMatchers(HttpMethod.POST, "/produto").hasRole("USER")
//.anyRequest().authenticated()     //qualquer outra requisição, requer autenticação

