package com.aurex.aurexbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Document {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "user_id", nullable = false) private User user;
    @Column(nullable = false, length = 512) private String originalFilename;
    @Column(nullable = false, length = 512) private String storedFilename;
    @Column(nullable = false, length = 160) private String contentType;
    @Column(nullable = false) private long fileSize;
    @Column(nullable = false, columnDefinition = "TEXT") private String extractedText;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist void setCreatedAtIfMissing() { if (createdAt == null) createdAt = LocalDateTime.now(); }
}
