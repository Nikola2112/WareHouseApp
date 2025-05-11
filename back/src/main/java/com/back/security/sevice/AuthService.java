package com.back.security.sevice;

import com.back.security.model.Users;
import com.back.security.dto.AuthRequest;
import com.back.security.dto.AuthResponse;
import com.back.security.model.UserRepository;
import com.back.security.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public AuthResponse register(AuthRequest request) {
        Users users = Users.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepo.save(users);
        String token = jwtService.generateToken(users);
        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest request) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword()));
        var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }
}
