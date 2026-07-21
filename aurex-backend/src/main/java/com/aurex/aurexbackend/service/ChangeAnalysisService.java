package com.aurex.aurexbackend.service;

import com.aurex.aurexbackend.dto.AnalysisResponse;
import com.aurex.aurexbackend.entity.ChangeRequest;
import com.aurex.aurexbackend.entity.User;
import com.aurex.aurexbackend.repository.ChangeRequestRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ChangeAnalysisService {
    private final ChangeRequestRepository repo;
    private final BankingRuleEngine engine;
    private final ObjectMapper mapper;

    public AnalysisResponse analyse(User user, String text) {
        AnalysisResponse report = build(null, text, engine.analyse(text));
        try {
            ChangeRequest saved = repo.save(ChangeRequest.builder().user(user).requestText(text).title(report.getTitle())
                    .riskScore(report.getRiskScore()).riskLevel(report.getRiskLevel()).confidenceScore(report.getConfidenceScore())
                    .summary(report.getSummary()).analysisJson(mapper.writeValueAsString(report)).createdAt(LocalDateTime.now()).build());
            report.setId(saved.getId());
            return report;
        } catch (Exception error) { throw new IllegalStateException("Unable to save analysis", error); }
    }
    public List<AnalysisResponse> history(User user, String q) {
        List<ChangeRequest> rows = q == null || q.isBlank() ? repo.findByUserIdOrderByCreatedAtDesc(user.getId()) : repo.findByUserIdAndRequestTextContainingIgnoreCaseOrderByCreatedAtDesc(user.getId(), q);
        return rows.stream().map(this::from).toList();
    }
    public AnalysisResponse get(User user, Long id) {
        return from(repo.findByIdAndUserId(id, user.getId()).orElseThrow(() -> new NoSuchElementException("Analysis not found")));
    }
    private AnalysisResponse from(ChangeRequest entity) {
        try { AnalysisResponse report = mapper.readValue(entity.getAnalysisJson(), AnalysisResponse.class); report.setId(entity.getId()); report.setCreatedAt(entity.getCreatedAt()); return report; }
        catch (Exception error) { throw new IllegalStateException("Unable to read analysis", error); }
    }
    @SuppressWarnings("unchecked")
    private AnalysisResponse build(Long id, String text, Map<String, Object> data) {
        int score = (int) data.get("score"); String level = (String) data.get("level");
        List<String> modules = (List<String>) data.get("modules"), hits = (List<String>) data.get("hits"), recommendations = (List<String>) data.get("recommendations"), reasons = (List<String>) data.get("reasons");
        String title = text.length() > 72 ? text.substring(0, 72) + "..." : text;
        String summary = "AUREX detected " + (hits.isEmpty() ? "a cross-functional banking change" : String.join(", ", hits)) + ". Controlled delivery is required across " + String.join(", ", modules.subList(0, Math.min(3, modules.size()))) + ".";
        return AnalysisResponse.builder().id(id).title(title).requestText(text).riskScore(score).riskLevel(level).confidenceScore(Math.min(98, 78 + hits.size() * 3 + ((List<String>) data.get("domains")).size() * 2)).summary(summary).executiveSummary(summary)
                .estimatedComplexity((String) data.get("complexity")).estimatedDevelopmentTime((String) data.get("developmentTime")).estimatedTestingTime((String) data.get("testingTime")).analysisSource("Banking Intelligence Engine")
                .businessImpact(List.of("Customers may experience changed journeys, limits or service availability.", "Operations teams need updated procedures and escalation playbooks.", "Compliance and management require traceable approval evidence."))
                .technicalImpact(List.of("Backend services and validation rules require review.", "API contracts, monitoring and notification flows require regression assessment.", "Database and integration compatibility must be validated."))
                .impactedModules(modules).developmentChecklist(List.of("Confirm business scope, owner, approvals and success criteria", "Update domain rules, service contracts, validation and audit events", "Prepare configuration or database migration with reversal path", "Complete peer review, release notes and operational handover"))
                .testingChecklist(List.of("Unit testing", "API testing", "Integration testing", "Regression testing", "Performance testing", "Security testing", "UAT with operations and compliance"))
                .deploymentChecklist(List.of("Approve implementation and rollback plan", "Back up affected configuration and data", "Deploy through a controlled environment", "Run smoke checks and monitor business metrics", "Validate rollback readiness"))
                .recommendations(recommendations).detectedKeywords(hits).affectedTeams((List<String>) data.get("teams")).suggestedWorkflow((List<String>) data.get("workflow")).rollbackPlan((List<String>) data.get("rollback")).deploymentNotes((List<String>) data.get("deploymentNotes")).detectedDomains((List<String>) data.get("domains"))
                .affectedApis((List<String>) data.get("apis")).affectedDatabaseTables((List<String>) data.get("tables")).riskFactors((Map<String,String>) data.get("riskFactors")).dependencyGraph((Map<String,String>) data.get("graph"))
                .complianceSuggestions(List.of("Confirm RBI, NPCI and internal policy applicability with Compliance.", "Retain approval, testing and release evidence in the change record.", "Verify audit logging, access controls and customer communication obligations."))
                .historicalSimilarRequests(List.of("Compare against prior requests with the same payment rail, product or control domain.", "Review post-implementation observations before final approval."))
                .approvalWorkflow(List.of("Business owner approval", "Architecture and security review", "Compliance sign-off", "CAB approval", "Post-release operations validation"))
                .riskExplanation(Map.of("business", reasons.isEmpty() ? "The request affects banking operations and should have named business ownership." : reasons.getFirst(), "technical", "Cross-service integrations, controls and observability must be assessed before production.", "security", hits.stream().anyMatch(x -> Set.of("OTP", "PIN", "AUTHENTICATION", "ENCRYPTION", "FRAUD").contains(x)) ? "Security-sensitive terms were detected; complete a formal security review." : "Verify least-privilege access and audit logging.", "compliance", hits.stream().anyMatch(x -> Set.of("RBI", "KYC", "AML", "COMPLIANCE", "NPCI").contains(x)) ? "Regulatory keywords were detected; compliance sign-off is required." : "Retain approvals and evidence for auditability."))
                .effort(Map.of("developerHours", (12 + modules.size() * 5) + "–" + (20 + modules.size() * 8) + " hours", "testingHours", (8 + modules.size() * 3) + "–" + (14 + modules.size() * 5) + " hours", "reviewHours", "4–8 hours", "timeline", (String) data.get("developmentTime"))).build();
    }
}
