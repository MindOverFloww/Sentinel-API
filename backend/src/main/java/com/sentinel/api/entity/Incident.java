package com.sentinel.api.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidents")
public class Incident {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 64)
    private String id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "type", nullable = false, length = 64)
    private String type;

    @Enumerated(EnumType.STRING)
    @Column(name = "severity", nullable = false, length = 32)
    private IncidentSeverity severity;

    @Column(name = "risk_score", nullable = false)
    private Integer riskScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 32)
    private IncidentStatus status;

    @Column(name = "source_ip", nullable = false, length = 64)
    private String sourceIp;

    @Column(name = "endpoint", nullable = false, length = 255)
    private String endpoint;

    @Column(name = "http_method", nullable = false, length = 16)
    private String httpMethod;

    @Column(name = "detection_source", length = 32)
    private String detectionSource = "RULE";

    @Column(name = "detection_rule", length = 255)
    private String detectionRule;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "request_count")
    private Integer requestCount = 1;

    @Column(name = "failed_count")
    private Integer failedCount = 0;

    @Column(name = "sample_payload", columnDefinition = "TEXT")
    private String samplePayload;

    @Column(name = "rule_findings", columnDefinition = "TEXT")
    private String ruleFindings;

    @Column(name = "factors", columnDefinition = "TEXT")
    private String factors;

    @Column(name = "recommended_action", columnDefinition = "TEXT")
    private String recommendedAction;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Incident() {
    }

    public Incident(String id, String title, String type, IncidentSeverity severity, Integer riskScore,
                    IncidentStatus status, String sourceIp, String endpoint, String httpMethod) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.severity = severity;
        this.riskScore = riskScore;
        this.status = status;
        this.sourceIp = sourceIp;
        this.endpoint = endpoint;
        this.httpMethod = httpMethod;
    }

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        if (this.createdAt == null) {
            this.createdAt = now;
        }
        if (this.updatedAt == null) {
            this.updatedAt = now;
        }
        if (this.status == null) {
            this.status = IncidentStatus.OPEN;
        }
        if (this.detectionSource == null) {
            this.detectionSource = "RULE";
        }
        if (this.requestCount == null) {
            this.requestCount = 1;
        }
        if (this.failedCount == null) {
            this.failedCount = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public IncidentSeverity getSeverity() {
        return severity;
    }

    public void setSeverity(IncidentSeverity severity) {
        this.severity = severity;
    }

    public Integer getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }

    public IncidentStatus getStatus() {
        return status;
    }

    public void setStatus(IncidentStatus status) {
        this.status = status;
    }

    public String getSourceIp() {
        return sourceIp;
    }

    public void setSourceIp(String sourceIp) {
        this.sourceIp = sourceIp;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public String getHttpMethod() {
        return httpMethod;
    }

    public void setHttpMethod(String httpMethod) {
        this.httpMethod = httpMethod;
    }

    public String getDetectionSource() {
        return detectionSource;
    }

    public void setDetectionSource(String detectionSource) {
        this.detectionSource = detectionSource;
    }

    public String getDetectionRule() {
        return detectionRule;
    }

    public void setDetectionRule(String detectionRule) {
        this.detectionRule = detectionRule;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRequestCount() {
        return requestCount;
    }

    public void setRequestCount(Integer requestCount) {
        this.requestCount = requestCount;
    }

    public Integer getFailedCount() {
        return failedCount;
    }

    public void setFailedCount(Integer failedCount) {
        this.failedCount = failedCount;
    }

    public String getSamplePayload() {
        return samplePayload;
    }

    public void setSamplePayload(String samplePayload) {
        this.samplePayload = samplePayload;
    }

    public String getRuleFindings() {
        return ruleFindings;
    }

    public void setRuleFindings(String ruleFindings) {
        this.ruleFindings = ruleFindings;
    }

    public String getFactors() {
        return factors;
    }

    public void setFactors(String factors) {
        this.factors = factors;
    }

    public String getRecommendedAction() {
        return recommendedAction;
    }

    public void setRecommendedAction(String recommendedAction) {
        this.recommendedAction = recommendedAction;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
