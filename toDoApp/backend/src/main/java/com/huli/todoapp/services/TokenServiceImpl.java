package com.huli.todoapp.services;

import jakarta.servlet.http.Cookie;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class TokenServiceImpl implements TokenService {

  private final JwtEncoder jwtEncoder;
  @Value("${ACCESS_TOKEN_EXPIRATION_HOURS}")
  private String accessTokenExpiration;

  @Autowired
  public TokenServiceImpl(JwtEncoder jwtEncoder) {
    this.jwtEncoder = jwtEncoder;
  }

  @Override
  public Cookie generateToken(Authentication authentication) {
    Instant now = Instant.now();
    String scope = authentication.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.joining(" "));
    JwtClaimsSet claims = JwtClaimsSet.builder()
        .issuer("self")
        .issuedAt(now)
        .expiresAt(now.plus(Integer.parseInt(accessTokenExpiration), ChronoUnit.HOURS))
        .subject(authentication.getName())
        .claim("scope", scope)
        .build();
    String token = this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    Cookie cookie = new Cookie("jwtToken", token);
    cookie.setHttpOnly(true);
    return cookie;
  }
}
