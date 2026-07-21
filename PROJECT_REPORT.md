# AUREX Project Report

## Executive summary

AUREX is an Intelligent Banking Change Analysis Platform for assessing banking changes before production release. It converts a plain-language request into a structured, explainable engineering and governance report.

## Value proposition

- Offline operation with no external AI API or key
- Explainable, deterministic banking rules
- JWT-protected, user-owned analysis history
- Risk, module, checklist, recommendation, and effort outputs
- Modern React dashboard backed by Spring Boot and PostgreSQL

## Submission verification

Run PostgreSQL, start the Spring Boot service on port 8080, and run `npm run dev` in `frontend`. Register a user, submit a banking request, then verify Dashboard and History.
