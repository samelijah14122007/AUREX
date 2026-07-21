package com.aurex.aurexbackend.service;

import com.aurex.aurexbackend.dto.AuthResponse;
import com.aurex.aurexbackend.dto.LoginRequest;
import com.aurex.aurexbackend.dto.RegisterRequest;
import com.aurex.aurexbackend.entity.User;
import com.aurex.aurexbackend.exception.ApiException;
import com.aurex.aurexbackend.repository.UserRepository;
import com.aurex.aurexbackend.security.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public AuthResponse register(RegisterRequest request) {

        String email = normaliseEmail(request.getEmail());
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new ApiException("An account with this email already exists", HttpStatus.CONFLICT);
        }

        User user = User.builder()
                .name(request.getName())
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token, "User registered successfully");
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmailIgnoreCase(normaliseEmail(request.getEmail()))
                .orElseThrow(() -> new ApiException("Invalid email or password", HttpStatus.UNAUTHORIZED));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token, "Login successful");
    }

    private String normaliseEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
