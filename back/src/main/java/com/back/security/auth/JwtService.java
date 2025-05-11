package com.back.security.auth;



import com.back.security.model.Users;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.security.Key;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {
    private final Key key;
    private static final long EXP_MS = 2 * 60 * 60 * 1000; // 2h

    public JwtService(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    /* === Генерация из Users (Entity) === */
    public String generateToken(Users user) {
        return buildToken(user.getEmail(), user.getRole().name());
    }

    /* === Перегрузка из UserDetails === */
    public String generateToken(UserDetails ud) {
        // роль берём из первой authority, если нужна
        String role = ud.getAuthorities().isEmpty() ? "ROLE_USER" : ud.getAuthorities().iterator().next().getAuthority();
        return buildToken(ud.getUsername(), role);
    }

    /* === Проверка токена с учётом username === */
    public boolean validateToken(String token, UserDetails ud) {
        return isValid(token) && extractUsername(token).equals(ud.getUsername());
    }

    /* === Простой isValid без UserDetails (остаётся) === */
    public boolean isValid(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    // ---- private ----
    private String buildToken(String subject, String role) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(subject)
                .claim("roles", role)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusMillis(EXP_MS)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
