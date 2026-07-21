package com.aurex.aurexbackend.repository;

import com.aurex.aurexbackend.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByUserIdOrderByCreatedAtDesc(Long userId);
}
