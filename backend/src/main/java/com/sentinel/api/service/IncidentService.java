package com.sentinel.api.service;

import com.sentinel.api.dto.incident.IncidentResponse;
import com.sentinel.api.entity.Incident;
import com.sentinel.api.entity.IncidentSeverity;
import com.sentinel.api.entity.IncidentStatus;
import com.sentinel.api.exception.ResourceNotFoundException;
import com.sentinel.api.repository.IncidentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public Incident createIncident(Incident incident) {
        if (incident == null) {
            throw new IllegalArgumentException("Incident cannot be null");
        }

        if (incident.getId() == null || incident.getId().trim().isEmpty()) {
            long count = incidentRepository.count() + 1;
            incident.setId(String.format("INC-%05d", count));
        }

        if (incident.getStatus() == null) {
            incident.setStatus(IncidentStatus.OPEN);
        }

        if (incident.getCreatedAt() == null) {
            incident.setCreatedAt(LocalDateTime.now());
        }
        incident.setUpdatedAt(LocalDateTime.now());

        return incidentRepository.save(incident);
    }

    @Transactional(readOnly = true)
    public List<IncidentResponse> getAllIncidents(IncidentStatus status, IncidentSeverity severity) {
        List<Incident> incidents;

        if (status != null && severity != null) {
            incidents = incidentRepository.findByStatusAndSeverityOrderByCreatedAtDesc(status, severity);
        } else if (status != null) {
            incidents = incidentRepository.findByStatusOrderByCreatedAtDesc(status);
        } else if (severity != null) {
            incidents = incidentRepository.findBySeverityOrderByCreatedAtDesc(severity);
        } else {
            incidents = incidentRepository.findAllByOrderByCreatedAtDesc();
        }

        return incidents.stream()
                .map(IncidentResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public IncidentResponse getIncidentById(String id) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Incident", "id", id));
        return IncidentResponse.fromEntity(incident);
    }

    public IncidentResponse updateIncidentStatus(String id, IncidentStatus newStatus, String notes) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Incident", "id", id));

        incident.setStatus(newStatus);
        if (notes != null && !notes.trim().isEmpty()) {
            String existingNotes = incident.getNotes() != null ? incident.getNotes() + "\n" : "";
            incident.setNotes(existingNotes + notes.trim());
        }
        incident.setUpdatedAt(LocalDateTime.now());

        Incident updated = incidentRepository.save(incident);
        return IncidentResponse.fromEntity(updated);
    }

    @Transactional(readOnly = true)
    public long getOpenIncidentsCount() {
        return incidentRepository.countByStatus(IncidentStatus.OPEN);
    }

    @Transactional(readOnly = true)
    public long getCriticalIncidentsCount() {
        return incidentRepository.countBySeverity(IncidentSeverity.CRITICAL);
    }

    @Transactional(readOnly = true)
    public long getInvestigatingIncidentsCount() {
        return incidentRepository.countByStatus(IncidentStatus.INVESTIGATING);
    }

    @Transactional(readOnly = true)
    public long getResolvedIncidentsCount() {
        return incidentRepository.countByStatus(IncidentStatus.RESOLVED);
    }

    @Transactional(readOnly = true)
    public long getTotalIncidentsCount() {
        return incidentRepository.count();
    }

    @Transactional(readOnly = true)
    public int getPeakRiskScore() {
        Integer peak = incidentRepository.findPeakRiskScore();
        return peak != null ? peak : 0;
    }

    @Transactional(readOnly = true)
    public List<IncidentResponse> getRecentIncidents() {
        return incidentRepository.findTop10ByOrderByCreatedAtDesc().stream()
                .map(IncidentResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
