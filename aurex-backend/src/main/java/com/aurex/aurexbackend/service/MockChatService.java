package com.aurex.aurexbackend.service;

import com.aurex.aurexbackend.exception.ApiException;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClient;
import java.util.Map;

/**
 * Default AI provider - active whenever `ai.provider` is `mock` or unset.
 * Exists so the whole app (auth, JWT, the full chat UI round-trip) is
 * fully testable end-to-end without an API key.
 *
 * It does not call any external service - it generates a short,
 * rule-based reply locally. This is clearly not "real AI", but it lets
 * you validate that POST /api/ai/chat is reachable, authenticated, and
 * wired correctly through to the frontend while keeping all data local.
 */
@Service
@ConditionalOnProperty(name = "ai.provider", havingValue = "mock", matchIfMissing = true)
public class MockChatService implements AiChatService {

    @Value("${ollama.enabled:false}") private boolean ollamaEnabled;
    @Value("${ollama.base-url:http://localhost:11434}") private String ollamaBaseUrl;
    @Value("${ollama.model:llama3.2}") private String ollamaModel;

    @Override
    public String chat(String message) {

        if (message == null || message.isBlank()) {
            throw new ApiException("Message must not be empty", HttpStatus.BAD_REQUEST);
        }

        String reply = ollamaReply(message.trim());
        if (reply == null || reply.isBlank()) reply = buildReply(message.trim());

        return "[AUREX banking assistant]\n\n"
                + reply;
    }

    private String buildReply(String message) {
        String lower = message.toLowerCase();

        if (lower.matches(".*\\b(hi|hello|hey)\\b.*")) {
            return "Hello! I am AUREX's local banking assistant. Describe the affected product, control, "
                    + "or rollout scope and I will guide the governed change-analysis workflow.";
        }

        if (lower.contains("neft")) return "NEFT is an RBI-operated deferred settlement system for transferring funds between bank accounts. It is suited to routine account-to-account transfers; processing occurs in scheduled settlement batches.";
        if (lower.contains("rtgs") || lower.contains("imps")) return "RTGS settles eligible transfers individually in real time, typically for high-value transfers. IMPS is an immediate, 24×7 retail transfer service. Use the product’s current bank and NPCI limits for implementation decisions.";
        if (lower.contains("upi")) return "UPI is NPCI’s instant account-to-account payment framework. Settlement, reconciliation, dispute handling, fraud controls and transaction limits must be considered separately from the customer payment experience.";
        if (lower.contains("kyc")) return "KYC verifies a customer’s identity and risk profile. A sound KYC workflow includes customer due diligence, document validation, screening, periodic refresh and an auditable decision trail.";
        if (lower.contains("aml")) return "AML controls identify and investigate potentially suspicious activity. Typical controls include sanctions screening, transaction monitoring, alert triage, case management and regulatory reporting.";
        if (lower.contains("pci")) return "PCI DSS is the payment-card security standard. Minimise cardholder-data scope, protect data in transit and at rest, enforce access controls, log activity and validate security controls regularly.";
        if (lower.contains("swift")) return "SWIFT is a secure financial messaging network used for cross-border and interbank messages. It does not itself move funds; correspondent banking, sanctions screening and reconciliation remain essential.";
        if (lower.contains("cbs") || lower.contains("core banking")) return "A core banking system is the system of record for accounts, balances and posting. Changes need strong compatibility, ledger integrity, cut-over, reconciliation and rollback controls.";
        if (lower.contains("reconcil")) return "Transaction reconciliation compares records across channels, the core ledger, payment networks and settlement files. Investigate exceptions with clear ownership, ageing, evidence and correction controls.";
        if (lower.contains("?")) return "For this banking topic, identify the accountable owner, customer impact, controls, data involved and rollback condition. Use New Analysis for a request-specific risk assessment and governed delivery checklist.";

        return "I received: \"" + message + "\". For a governed delivery plan, use New Analysis; AUREX will map banking terms to impacted modules, controls, testing, and deployment steps locally.";
    }

    private String ollamaReply(String message) {
        if (!ollamaEnabled) return null;
        try {
            Map response = RestClient.create(ollamaBaseUrl).post().uri("/api/generate")
                    .body(Map.of("model", ollamaModel, "prompt", "Answer this banking question concisely and accurately. Do not provide financial advice: " + message, "stream", false))
                    .retrieve().body(Map.class);
            Object answer = response == null ? null : response.get("response");
            return answer == null ? null : answer.toString().trim();
        } catch (Exception ignored) { return null; }
    }
}
