package com.aurex.aurexbackend.dto;
import jakarta.validation.constraints.*;
import lombok.*;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AnalysisRequest { @NotBlank @Size(max=5000) private String requestText; }
