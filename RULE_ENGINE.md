# Banking Intelligence Engine

The Banking Intelligence Engine is deterministic, explainable, and runs entirely in Java.

It maps banking vocabulary into rule categories including payments, compliance, lending, security, platform integration, and limit management. Each matching category contributes impacted modules, recommendations, and risk weight.

## Explainability

Every analysis exposes the detected keywords, applicable modules, risk rationale, checklists, effort estimate, and recommendation set. This makes the outcome reviewable by engineering, operations, security, and compliance teams.

## No external model dependency

The engine does not call Gemini, OpenAI, Claude, Groq, Ollama, HuggingFace, or any external AI API. It requires no API key and keeps request content inside the deployed application boundary.
