package com.aurex.aurexbackend.controller;

import com.aurex.aurexbackend.dto.ChatRequest;
import com.aurex.aurexbackend.dto.ChatResponse;
import com.aurex.aurexbackend.service.AiChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * Kept for backward compatibility with any existing callers of the
 * original /api/chat route. Functionally identical to
 * AIController#chat - new integrations should prefer
 * POST /api/ai/chat.
 */
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final AiChatService aiChatService;

    @PostMapping
    public ChatResponse chat(@Valid @RequestBody ChatRequest request) {
        String reply = aiChatService.chat(request.getMessage());
        return new ChatResponse(reply);
    }
}
