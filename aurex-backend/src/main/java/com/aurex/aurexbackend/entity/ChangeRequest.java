package com.aurex.aurexbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "change_requests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ChangeRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "user_id", nullable = false) private User user;
    @Column(nullable = false, length = 5000) private String requestText;
    @Column(nullable = false) private int riskScore;
    @Column(nullable = false, length = 16) private String riskLevel;
    @Column(nullable = false) private int confidenceScore;
    @Column(nullable = false, length = 1200) private String title;
    @Column(nullable = false, length = 4000) private String summary;
    @Column(nullable = false, columnDefinition = "TEXT") private String analysisJson;
    @Column(nullable = false) private LocalDateTime createdAt;

    @PrePersist
    void setCreatedAtIfMissing() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
