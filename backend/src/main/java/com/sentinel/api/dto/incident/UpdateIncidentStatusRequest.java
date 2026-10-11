package com.sentinel.api.dto.incident;

import com.sentinel.api.entity.IncidentStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateIncidentStatusRequest {

    @NotNull(message = "Incident status is required")
    private IncidentStatus status;

    private String notes;

    public UpdateIncidentStatusRequest() {
    }

    public UpdateIncidentStatusRequest(IncidentStatus status, String notes) {
        this.status = status;
        this.notes = notes;
    }

    public IncidentStatus getStatus() {
        return status;
    }

    public void setStatus(IncidentStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
