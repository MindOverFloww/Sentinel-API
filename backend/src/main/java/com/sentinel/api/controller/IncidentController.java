package com.sentinel.api.controller;

import com.sentinel.api.dto.incident.IncidentResponse;
import com.sentinel.api.dto.incident.UpdateIncidentStatusRequest;
import com.sentinel.api.entity.Incident;
import com.sentinel.api.entity.IncidentSeverity;
import com.sentinel.api.entity.IncidentStatus;
import com.sentinel.api.service.IncidentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "*")
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @GetMapping
    public ResponseEntity<List<IncidentResponse>> getAllIncidents(
            @RequestParam(required = false) IncidentStatus status,
            @RequestParam(required = false) IncidentSeverity severity) {
        List<IncidentResponse> incidents = incidentService.getAllIncidents(status, severity);
        return ResponseEntity.ok(incidents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidentResponse> getIncidentById(@PathVariable String id) {
        IncidentResponse incident = incidentService.getIncidentById(id);
        return ResponseEntity.ok(incident);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<IncidentResponse> updateIncidentStatus(
            @PathVariable String id,
            @Valid @RequestBody UpdateIncidentStatusRequest request) {
        IncidentResponse updated = incidentService.updateIncidentStatus(
                id,
                request.getStatus(),
                request.getNotes()
        );
        return ResponseEntity.ok(updated);
    }

    @PostMapping
    public ResponseEntity<IncidentResponse> createIncident(@RequestBody Incident incident) {
        Incident created = incidentService.createIncident(incident);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(IncidentResponse.fromEntity(created));
    }
}
