package com.aurex.aurexbackend.repository;
import com.aurex.aurexbackend.entity.ChangeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface ChangeRequestRepository extends JpaRepository<ChangeRequest, Long> {
 List<ChangeRequest> findByUserIdOrderByCreatedAtDesc(Long userId);
 List<ChangeRequest> findByUserIdAndRequestTextContainingIgnoreCaseOrderByCreatedAtDesc(Long userId, String query);
 Optional<ChangeRequest> findByIdAndUserId(Long id, Long userId);
}
