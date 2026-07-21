package com.aurex.aurexbackend.controller;

import com.aurex.aurexbackend.dto.DocumentResponse;
import com.aurex.aurexbackend.entity.User;
import com.aurex.aurexbackend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@RestController @RequestMapping("/api/documents") @RequiredArgsConstructor
public class DocumentController {
    private final DocumentService service;
    @PostMapping(consumes = "multipart/form-data")
    public DocumentResponse upload(@AuthenticationPrincipal User user, @RequestPart("file") MultipartFile file, @RequestParam(defaultValue = "true") boolean analyse) { return service.upload(user, file, analyse); }
    @GetMapping public List<DocumentResponse> history(@AuthenticationPrincipal User user) { return service.history(user); }
}
