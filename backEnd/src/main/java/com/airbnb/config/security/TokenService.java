package com.airbnb.config.security;

import com.airbnb.model.UserAuthDTO;
import com.airbnb.model.Usuario;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class TokenService
{
	public String gerarToken(UserAuthDTO usuario)
	{
		Algorithm algorithm = Algorithm.HMAC256("12345678");
		return JWT.create()
				       .withIssuer("API Digital Booking")
				       .withSubject(usuario.getUsername())
				       .withExpiresAt(dataExpiracao())
				       .sign(algorithm);
	}
	private Instant dataExpiracao()
	{
		return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
	}
	
}
