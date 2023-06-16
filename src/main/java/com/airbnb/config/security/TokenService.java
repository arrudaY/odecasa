package com.airbnb.config.security;

import com.airbnb.model.UserAuthDTO;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.stereotype.Service;;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService
{
	private String secret = "DigitalBooking";
	public String gerarToken(UserAuthDTO usuario)
	{
		Algorithm algorithm = Algorithm.HMAC256(secret);
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

	public String getSubject(String tokenJWT) {
		try {
			var algoritmo = Algorithm.HMAC256(secret);
			return JWT.require(algoritmo)
					.withIssuer("API Digital Booking")
					.build()
					.verify(tokenJWT)
					.getSubject();
		} catch (JWTVerificationException exception) {
			throw new RuntimeException("Token JWT invalido ou expirado!");
		}
	}
}
