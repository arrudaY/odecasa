package com.airbnb.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpMethod;

@Configuration
public class WebSecurityConfig {

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception
	{
		return configuration.getAuthenticationManager();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.csrf().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers(HttpMethod.POST, "/auth")
						.permitAll()
						.requestMatchers(HttpMethod.GET, "/cidade/**", "/categoria/**", "/produto/**")
						.permitAll()
						.requestMatchers(HttpMethod.POST, "/usuario")
						.permitAll()
						.anyRequest().authenticated()
						.and()

				)
				.cors(cors -> cors // Habilitar configuração CORS personalizada
						.configurationSource(corsConfigurationSource())
				)
				.headers(headers -> headers // Permitir cabeçalho Access-Control-Allow-Origin
						.addHeaderWriter((request, response) -> response.setHeader("Access-Control-Allow-Origin", "*"))
				);

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("*");
		configuration.addAllowedHeader("*");
		configuration.addAllowedMethod("*");
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
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
