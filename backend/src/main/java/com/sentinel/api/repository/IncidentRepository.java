package com.sentinel.api.repository;

import com.sentinel.api.entity.Incident;
import com.sentinel.api.entity.IncidentSeverity;
import com.sentinel.api.entity.IncidentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, String> {

    List<Incident> findAllByOrderByCreatedAtDesc();

    List<Incident> findByStatusOrderByCreatedAtDesc(IncidentStatus status);

    List<Incident> findBySeverityOrderByCreatedAtDesc(IncidentSeverity severity);

    List<Incident> findByStatusAndSeverityOrderByCreatedAtDesc(IncidentStatus status, IncidentSeverity severity);

    long countByStatus(IncidentStatus status);

    long countBySeverity(IncidentSeverity severity);

    @Query("SELECT COALESCE(MAX(i.riskScore), 0) FROM Incident i")
    Integer findPeakRiskScore();

    List<Incident> findTop10ByOrderByCreatedAtDesc();
}
