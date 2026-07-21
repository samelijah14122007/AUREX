package com.aurex.aurexbackend.controller;

import com.aurex.aurexbackend.dto.ChatRequest;
import com.aurex.aurexbackend.dto.ChatResponse;
import com.aurex.aurexbackend.service.AiChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * Primary AI chat endpoint used by the frontend.
 * Protected by JWT (see SecurityConfig) - requires
 * "Authorization: Bearer <token>" header, obtained from
 * POST /api/auth/login or /api/auth/register.
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AiChatService aiChatService;

    @PostMapping("/chat")
    public ChatResponse chat(@Valid @RequestBody ChatRequest request) {
        String reply = aiChatService.chat(request.getMessage());
        return new ChatResponse(reply);
    }
}
