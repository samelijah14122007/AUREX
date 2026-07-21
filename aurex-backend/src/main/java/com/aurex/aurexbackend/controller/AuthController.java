package com.aurex.aurexbackend.controller;

import com.aurex.aurexbackend.dto.AuthResponse;
import com.aurex.aurexbackend.dto.LoginRequest;
import com.aurex.aurexbackend.dto.RegisterRequest;
import com.aurex.aurexbackend.dto.UserProfileResponse;
import com.aurex.aurexbackend.entity.User;
import com.aurex.aurexbackend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    /**
     * Returns the currently authenticated user's profile.
     * Useful for the frontend to validate a stored token on app load
     * and to hydrate the logged-in user's name/email without re-decoding
     * the JWT on the client.
     */
    @GetMapping("/me")
    public UserProfileResponse me(@AuthenticationPrincipal User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
