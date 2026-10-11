package com.sentinel.api.dto.incident;

import com.sentinel.api.entity.Incident;
import com.sentinel.api.entity.IncidentSeverity;
import com.sentinel.api.entity.IncidentStatus;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class IncidentResponse {

    private String id;
    private String title;
    private String type;
    private IncidentSeverity severity;
    private Integer riskScore;
    private IncidentStatus status;
    private String sourceIp;
    private String endpoint;
    private String method;
    private String detectionSource;
    private String detectionRule;
    private String description;
    private Integer requestCount;
    private Integer failedCount;
    private String samplePayload;
    private List<String> ruleFindings;
    private String factors;
    private String recommendedAction;
    private String notes;
    private String createdAt;
    private String updatedAt;
    private String detectedAt;

    public IncidentResponse() {
    }

    public static IncidentResponse fromEntity(Incident entity) {
        if (entity == null) {
            return null;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        IncidentResponse dto = new IncidentResponse();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setType(entity.getType());
        dto.setSeverity(entity.getSeverity());
        dto.setRiskScore(entity.getRiskScore());
        dto.setStatus(entity.getStatus());
        dto.setSourceIp(entity.getSourceIp());
        dto.setEndpoint(entity.getEndpoint());
        dto.setMethod(entity.getHttpMethod());
        dto.setDetectionSource(entity.getDetectionSource());
        dto.setDetectionRule(entity.getDetectionRule());
        dto.setDescription(entity.getDescription());
        dto.setRequestCount(entity.getRequestCount());
        dto.setFailedCount(entity.getFailedCount());
        dto.setSamplePayload(entity.getSamplePayload());
        dto.setFactors(entity.getFactors());
        dto.setRecommendedAction(entity.getRecommendedAction());
        dto.setNotes(entity.getNotes());

        if (entity.getCreatedAt() != null) {
            String isoDate = entity.getCreatedAt().format(formatter);
            dto.setCreatedAt(isoDate);
            dto.setDetectedAt(isoDate);
        }
        if (entity.getUpdatedAt() != null) {
            dto.setUpdatedAt(entity.getUpdatedAt().format(formatter));
        }

        List<String> findings = new ArrayList<>();
        if (entity.getRuleFindings() != null && !entity.getRuleFindings().isBlank()) {
            for (String finding : entity.getRuleFindings().split(";")) {
                if (!finding.trim().isEmpty()) {
                    findings.add(finding.trim());
                }
            }
        }
        dto.setRuleFindings(findings);

        return dto;
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

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
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

    public List<String> getRuleFindings() {
        return ruleFindings;
    }

    public void setRuleFindings(List<String> ruleFindings) {
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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getDetectedAt() {
        return detectedAt;
    }

    public void setDetectedAt(String detectedAt) {
        this.detectedAt = detectedAt;
    }
}
