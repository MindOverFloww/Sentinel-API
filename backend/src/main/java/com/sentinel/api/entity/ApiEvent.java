package com.sentinel.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "api_events", indexes = {
        @Index(name = "idx_api_events_timestamp", columnList = "timestamp DESC"),
        @Index(name = "idx_api_events_endpoint", columnList = "endpoint"),
        @Index(name = "idx_api_events_status", columnList = "statusCode"),
        @Index(name = "idx_api_events_source_ip", columnList = "source_ip")
})
public class ApiEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Instant timestamp;

    @Column(nullable = false, length = 10)
    private String method;

    @Column(nullable = false, length = 500)
    private String endpoint;

    @Column(nullable = false)
    private int statusCode;

    @Column(nullable = false)
    private long responseTimeMs;

    @Column(name = "request_size_bytes")
    private Long requestSizeBytes;

    @Column(name = "response_size_bytes")
    private Long responseSizeBytes;

    @Column(name = "source_ip", length = 64)
    private String sourceIp;

    @Column(name = "user_agent", length = 1000)
    private String userAgent;

    @Column(nullable = false)
    private boolean authenticated;

    public ApiEvent() {
    }

    public ApiEvent(Long id, Instant timestamp, String method, String endpoint, int statusCode,
                    long responseTimeMs, Long requestSizeBytes, Long responseSizeBytes,
                    String sourceIp, String userAgent, boolean authenticated) {
        this.id = id;
        this.timestamp = timestamp;
        this.method = method;
        this.endpoint = endpoint;
        this.statusCode = statusCode;
        this.responseTimeMs = responseTimeMs;
        this.requestSizeBytes = requestSizeBytes;
        this.responseSizeBytes = responseSizeBytes;
        this.sourceIp = sourceIp;
        this.userAgent = userAgent;
        this.authenticated = authenticated;
    }

    // Builder pattern for clean instantiation
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Instant timestamp;
        private String method;
        private String endpoint;
        private int statusCode;
        private long responseTimeMs;
        private Long requestSizeBytes;
        private Long responseSizeBytes;
        private String sourceIp;
        private String userAgent;
        private boolean authenticated;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder timestamp(Instant timestamp) { this.timestamp = timestamp; return this; }
        public Builder method(String method) { this.method = method; return this; }
        public Builder endpoint(String endpoint) { this.endpoint = endpoint; return this; }
        public Builder statusCode(int statusCode) { this.statusCode = statusCode; return this; }
        public Builder responseTimeMs(long responseTimeMs) { this.responseTimeMs = responseTimeMs; return this; }
        public Builder requestSizeBytes(Long requestSizeBytes) { this.requestSizeBytes = requestSizeBytes; return this; }
        public Builder responseSizeBytes(Long responseSizeBytes) { this.responseSizeBytes = responseSizeBytes; return this; }
        public Builder sourceIp(String sourceIp) { this.sourceIp = sourceIp; return this; }
        public Builder userAgent(String userAgent) { this.userAgent = userAgent; return this; }
        public Builder authenticated(boolean authenticated) { this.authenticated = authenticated; return this; }

        public ApiEvent build() {
            return new ApiEvent(id, timestamp, method, endpoint, statusCode, responseTimeMs,
                    requestSizeBytes, responseSizeBytes, sourceIp, userAgent, authenticated);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }

    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }

    public long getResponseTimeMs() { return responseTimeMs; }
    public void setResponseTimeMs(long responseTimeMs) { this.responseTimeMs = responseTimeMs; }

    public Long getRequestSizeBytes() { return requestSizeBytes; }
    public void setRequestSizeBytes(Long requestSizeBytes) { this.requestSizeBytes = requestSizeBytes; }

    public Long getResponseSizeBytes() { return responseSizeBytes; }
    public void setResponseSizeBytes(Long responseSizeBytes) { this.responseSizeBytes = responseSizeBytes; }

    public String getSourceIp() { return sourceIp; }
    public void setSourceIp(String sourceIp) { this.sourceIp = sourceIp; }

    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }

    public boolean isAuthenticated() { return authenticated; }
    public void setAuthenticated(boolean authenticated) { this.authenticated = authenticated; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApiEvent apiEvent)) return false;
        return Objects.equals(id, apiEvent.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
