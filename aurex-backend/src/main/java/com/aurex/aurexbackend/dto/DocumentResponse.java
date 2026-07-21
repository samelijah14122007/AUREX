package com.aurex.aurexbackend.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class DocumentResponse {
    private Long id;
    private String filename;
    private String contentType;
    private long fileSize;
    private int extractedCharacters;
    private LocalDateTime createdAt;
    private AnalysisResponse analysis;
}
