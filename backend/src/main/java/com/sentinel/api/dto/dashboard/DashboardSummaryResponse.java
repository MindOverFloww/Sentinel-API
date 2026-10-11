package com.sentinel.api.dto.dashboard;

import com.sentinel.api.dto.incident.IncidentResponse;

import java.util.ArrayList;
import java.util.List;

public class DashboardSummaryResponse {

    private long monitoredRequestsCount;
    private long openIncidentsCount;
    private long criticalIncidentsCount;
    private int peakRiskScore;
    private String activeRulesCount;
    private long resolvedIncidentsCount;
    private long investigatingIncidentsCount;
    private long totalIncidentsCount;
    private List<IncidentResponse> recentIncidents = new ArrayList<>();

    public DashboardSummaryResponse() {
    }

    public DashboardSummaryResponse(long monitoredRequestsCount, long openIncidentsCount,
                                    long criticalIncidentsCount, int peakRiskScore,
                                    String activeRulesCount, long resolvedIncidentsCount,
                                    long investigatingIncidentsCount, long totalIncidentsCount,
                                    List<IncidentResponse> recentIncidents) {
        this.monitoredRequestsCount = monitoredRequestsCount;
        this.openIncidentsCount = openIncidentsCount;
        this.criticalIncidentsCount = criticalIncidentsCount;
        this.peakRiskScore = peakRiskScore;
        this.activeRulesCount = activeRulesCount;
        this.resolvedIncidentsCount = resolvedIncidentsCount;
        this.investigatingIncidentsCount = investigatingIncidentsCount;
        this.totalIncidentsCount = totalIncidentsCount;
        this.recentIncidents = recentIncidents != null ? recentIncidents : new ArrayList<>();
    }

    // Getters and Setters

    public long getMonitoredRequestsCount() {
        return monitoredRequestsCount;
    }

    public void setMonitoredRequestsCount(long monitoredRequestsCount) {
        this.monitoredRequestsCount = monitoredRequestsCount;
    }

    public long getOpenIncidentsCount() {
        return openIncidentsCount;
    }

    public void setOpenIncidentsCount(long openIncidentsCount) {
        this.openIncidentsCount = openIncidentsCount;
    }

    public long getCriticalIncidentsCount() {
        return criticalIncidentsCount;
    }

    public void setCriticalIncidentsCount(long criticalIncidentsCount) {
        this.criticalIncidentsCount = criticalIncidentsCount;
    }

    public int getPeakRiskScore() {
        return peakRiskScore;
    }

    public void setPeakRiskScore(int peakRiskScore) {
        this.peakRiskScore = peakRiskScore;
    }

    public String getActiveRulesCount() {
        return activeRulesCount;
    }

    public void setActiveRulesCount(String activeRulesCount) {
        this.activeRulesCount = activeRulesCount;
    }

    public long getResolvedIncidentsCount() {
        return resolvedIncidentsCount;
    }

    public void setResolvedIncidentsCount(long resolvedIncidentsCount) {
        this.resolvedIncidentsCount = resolvedIncidentsCount;
    }

    public long getInvestigatingIncidentsCount() {
        return investigatingIncidentsCount;
    }

    public void setInvestigatingIncidentsCount(long investigatingIncidentsCount) {
        this.investigatingIncidentsCount = investigatingIncidentsCount;
    }

    public long getTotalIncidentsCount() {
        return totalIncidentsCount;
    }

    public void setTotalIncidentsCount(long totalIncidentsCount) {
        this.totalIncidentsCount = totalIncidentsCount;
    }

    public List<IncidentResponse> getRecentIncidents() {
        return recentIncidents;
    }

    public void setRecentIncidents(List<IncidentResponse> recentIncidents) {
        this.recentIncidents = recentIncidents;
    }
}
