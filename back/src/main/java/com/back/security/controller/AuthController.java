package com.back.security.controller;



import com.back.security.dto.AuthRequest;
import com.back.security.dto.AuthResponse;
import com.back.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true",
        maxAge = 3600
)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest req) {
        return buildAuthResponse(authService.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {
        return buildAuthResponse(authService.login(req));
    }

    /** Оборачиваем ответ + кладём cookie */
    private ResponseEntity<AuthResponse> buildAuthResponse(AuthResponse res) {
        ResponseCookie cookie = ResponseCookie
                .from("token", res.getToken())
                .httpOnly(true)        // JS не увидит — XSS-безопасно
                .secure(false)         // true → если приложение по HTTPS
                .sameSite("Lax")       // или Strict / None
                .path("/")
                .maxAge(Duration.ofHours(2))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(res);           // можно вернуть объект без token, если не нужен на фронте
    }
}

