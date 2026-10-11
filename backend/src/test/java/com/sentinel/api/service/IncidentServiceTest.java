package com.sentinel.api.service;

import com.sentinel.api.dto.incident.IncidentResponse;
import com.sentinel.api.entity.Incident;
import com.sentinel.api.entity.IncidentSeverity;
import com.sentinel.api.entity.IncidentStatus;
import com.sentinel.api.exception.ResourceNotFoundException;
import com.sentinel.api.repository.IncidentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IncidentServiceTest {

    @Mock
    private IncidentRepository incidentRepository;

    @InjectMocks
    private IncidentService incidentService;

    private Incident sampleIncident;

    @BeforeEach
    void setUp() {
        sampleIncident = new Incident(
                "INC-00001",
                "Burst Authentication Failure Trigger",
                "BRUTE_FORCE",
                IncidentSeverity.CRITICAL,
                85,
                IncidentStatus.OPEN,
                "192.168.1.105",
                "/api/demo/login",
                "POST"
        );
        sampleIncident.setDescription("Detected 6 failed login attempts in 18 seconds");
        sampleIncident.setDetectionRule("Excessive Failed Login Attempts (Threshold: 5 / 60s)");
        sampleIncident.setRequestCount(6);
        sampleIncident.setFailedCount(6);
        sampleIncident.setCreatedAt(LocalDateTime.now());
        sampleIncident.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void createIncident_Success_ShouldGenerateIdWhenMissing() {
        Incident newIncident = new Incident();
        newIncident.setTitle("SQL Injection Detection");
        newIncident.setType("SQL_INJECTION");
        newIncident.setSeverity(IncidentSeverity.HIGH);
        newIncident.setRiskScore(75);
        newIncident.setSourceIp("10.0.4.12");
        newIncident.setEndpoint("/api/demo/products");
        newIncident.setHttpMethod("GET");

        when(incidentRepository.count()).thenReturn(1L);
        when(incidentRepository.save(any(Incident.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Incident created = incidentService.createIncident(newIncident);

        assertNotNull(created);
        assertEquals("INC-00002", created.getId());
        assertEquals(IncidentStatus.OPEN, created.getStatus());
        assertNotNull(created.getCreatedAt());
        verify(incidentRepository, times(1)).save(newIncident);
    }

    @Test
    void createIncident_NullIncident_ShouldThrowException() {
        assertThrows(IllegalArgumentException.class, () -> incidentService.createIncident(null));
        verify(incidentRepository, never()).save(any());
    }

    @Test
    void getAllIncidents_WithoutFilters_ShouldReturnAll() {
        when(incidentRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(sampleIncident));

        List<IncidentResponse> results = incidentService.getAllIncidents(null, null);

        assertEquals(1, results.size());
        assertEquals("INC-00001", results.get(0).getId());
        assertEquals("BRUTE_FORCE", results.get(0).getType());
        verify(incidentRepository, times(1)).findAllByOrderByCreatedAtDesc();
    }

    @Test
    void getAllIncidents_WithStatusAndSeverity_ShouldFilterBoth() {
        when(incidentRepository.findByStatusAndSeverityOrderByCreatedAtDesc(IncidentStatus.OPEN, IncidentSeverity.CRITICAL))
                .thenReturn(List.of(sampleIncident));

        List<IncidentResponse> results = incidentService.getAllIncidents(IncidentStatus.OPEN, IncidentSeverity.CRITICAL);

        assertEquals(1, results.size());
        assertEquals(IncidentSeverity.CRITICAL, results.get(0).getSeverity());
        assertEquals(IncidentStatus.OPEN, results.get(0).getStatus());
        verify(incidentRepository, times(1))
                .findByStatusAndSeverityOrderByCreatedAtDesc(IncidentStatus.OPEN, IncidentSeverity.CRITICAL);
    }

    @Test
    void getIncidentById_ExistingId_ShouldReturnIncidentResponse() {
        when(incidentRepository.findById("INC-00001")).thenReturn(Optional.of(sampleIncident));

        IncidentResponse response = incidentService.getIncidentById("INC-00001");

        assertNotNull(response);
        assertEquals("INC-00001", response.getId());
        assertEquals("POST", response.getMethod());
        assertEquals(85, response.getRiskScore());
    }

    @Test
    void getIncidentById_NotFound_ShouldThrowResourceNotFoundException() {
        when(incidentRepository.findById("INC-99999")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> incidentService.getIncidentById("INC-99999"));
    }

    @Test
    void updateIncidentStatus_Success_ShouldUpdateStatusAndAppendNotes() {
        when(incidentRepository.findById("INC-00001")).thenReturn(Optional.of(sampleIncident));
        when(incidentRepository.save(any(Incident.class))).thenAnswer(invocation -> invocation.getArgument(0));

        IncidentResponse response = incidentService.updateIncidentStatus(
                "INC-00001",
                IncidentStatus.INVESTIGATING,
                "Analyst investigating IP 192.168.1.105"
        );

        assertNotNull(response);
        assertEquals(IncidentStatus.INVESTIGATING, response.getStatus());
        assertTrue(response.getNotes().contains("Analyst investigating IP 192.168.1.105"));
        verify(incidentRepository, times(1)).save(sampleIncident);
    }

    @Test
    void updateIncidentStatus_NotFound_ShouldThrowResourceNotFoundException() {
        when(incidentRepository.findById("INC-99999")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                incidentService.updateIncidentStatus("INC-99999", IncidentStatus.RESOLVED, "Done"));
    }

    @Test
    void getOpenIncidentsCount_ShouldReturnCount() {
        when(incidentRepository.countByStatus(IncidentStatus.OPEN)).thenReturn(4L);

        long count = incidentService.getOpenIncidentsCount();

        assertEquals(4L, count);
        verify(incidentRepository, times(1)).countByStatus(IncidentStatus.OPEN);
    }

    @Test
    void getPeakRiskScore_ShouldReturnMaxRiskScore() {
        when(incidentRepository.findPeakRiskScore()).thenReturn(95);

        int peak = incidentService.getPeakRiskScore();

        assertEquals(95, peak);
        verify(incidentRepository, times(1)).findPeakRiskScore();
    }
}
