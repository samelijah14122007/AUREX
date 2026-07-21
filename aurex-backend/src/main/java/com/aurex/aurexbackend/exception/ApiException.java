package com.aurex.aurexbackend.exception;

import org.springframework.http.HttpStatus;

/**
 * Thrown by service-layer code for expected, client-facing failures
 * (e.g. "email already exists", "invalid password") so the
 * GlobalExceptionHandler can turn them into a proper HTTP status +
 * JSON body instead of a generic 500.
 */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
