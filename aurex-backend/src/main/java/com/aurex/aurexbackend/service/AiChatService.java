package com.aurex.aurexbackend.service;

/**
 * Abstraction over "whatever answers the AI chat endpoint".
 *
 * The local implementation requires no internet connection or API key.
 */
public interface AiChatService {
    String chat(String message);
}
