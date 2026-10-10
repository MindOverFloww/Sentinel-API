package com.sentinel.api.dto.event;

import com.sentinel.api.entity.ApiEvent;

import java.time.Instant;

public class ApiEventResponse {

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

    public ApiEventResponse() {
    }

    public ApiEventResponse(Long id, Instant timestamp, String method, String endpoint, int statusCode,
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

    public static ApiEventResponse fromEntity(ApiEvent event) {
        if (event == null) {
            return null;
        }
        return new ApiEventResponse(
                event.getId(),
                event.getTimestamp(),
                event.getMethod(),
                event.getEndpoint(),
                event.getStatusCode(),
                event.getResponseTimeMs(),
                event.getRequestSizeBytes(),
                event.getResponseSizeBytes(),
                event.getSourceIp(),
                event.getUserAgent(),
                event.isAuthenticated()
        );
    }

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
}
