package com.aurex.aurexbackend.dto;
import lombok.*; import java.time.LocalDateTime; import java.util.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class AnalysisResponse {
 private Long id; private String title; private String requestText; private int riskScore; private String riskLevel; private int confidenceScore; private String summary; private String executiveSummary; private String estimatedComplexity; private String estimatedDevelopmentTime; private String estimatedTestingTime; private String analysisSource; private LocalDateTime createdAt;
 private List<String> businessImpact, technicalImpact, impactedModules, developmentChecklist, testingChecklist, deploymentChecklist, recommendations, detectedKeywords, affectedTeams, suggestedWorkflow, rollbackPlan, deploymentNotes, detectedDomains;
 private List<String> affectedApis, affectedDatabaseTables, complianceSuggestions, historicalSimilarRequests, approvalWorkflow;
 private Map<String,String> riskExplanation; private Map<String,String> effort, riskFactors, dependencyGraph;
}
