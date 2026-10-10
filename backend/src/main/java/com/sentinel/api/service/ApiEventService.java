package com.sentinel.api.service;

import com.sentinel.api.dto.event.ApiEventResponse;
import com.sentinel.api.entity.ApiEvent;
import com.sentinel.api.repository.ApiEventRepository;
import jakarta.persistence.criteria.Predicate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class ApiEventService {

    private static final Logger log = LoggerFactory.getLogger(ApiEventService.class);

    private final ApiEventRepository apiEventRepository;

    public ApiEventService(ApiEventRepository apiEventRepository) {
        this.apiEventRepository = apiEventRepository;
    }

    /**
     * Persists an API event record into PostgreSQL.
     * Safe execution: logs any database issues without throwing unchecked exceptions to callers.
     */
    @Transactional
    public ApiEvent recordEvent(ApiEvent event) {
        if (event == null) {
            log.warn("Attempted to record null ApiEvent");
            return null;
        }

        if (event.getTimestamp() == null) {
            event.setTimestamp(Instant.now());
        }

        try {
            ApiEvent saved = apiEventRepository.save(event);
            log.debug("Recorded API event ID={}, endpoint={}, status={}", saved.getId(), saved.getEndpoint(), saved.getStatusCode());
            return saved;
        } catch (Exception ex) {
            log.error("Failed to persist API event: {}", ex.getMessage(), ex);
            return null;
        }
    }

    /**
     * Retrieves paginated and filtered API events, newest first.
     */
    @Transactional(readOnly = true)
    public Page<ApiEventResponse> getEvents(
            String method,
            String endpoint,
            Integer statusCode,
            String sourceIp,
            Instant from,
            Instant to,
            Pageable pageable) {

        // Validate time range if both are provided
        if (from != null && to != null && from.isAfter(to)) {
            throw new IllegalArgumentException("'from' timestamp cannot be after 'to' timestamp");
        }

        // Always enforce newest-first ordering
        Sort sort = Sort.by(Sort.Direction.DESC, "timestamp");
        Pageable effectivePageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        Specification<ApiEvent> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (method != null && !method.isBlank()) {
                predicates.add(cb.equal(cb.upper(root.get("method")), method.trim().toUpperCase()));
            }

            if (endpoint != null && !endpoint.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("endpoint")), "%" + endpoint.trim().toLowerCase() + "%"));
            }

            if (statusCode != null) {
                predicates.add(cb.equal(root.get("statusCode"), statusCode));
            }

            if (sourceIp != null && !sourceIp.isBlank()) {
                predicates.add(cb.equal(root.get("sourceIp"), sourceIp.trim()));
            }

            if (from != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("timestamp"), from));
            }

            if (to != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("timestamp"), to));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return apiEventRepository.findAll(spec, effectivePageable).map(ApiEventResponse::fromEntity);
    }

    /**
     * Helper for Rinku's detection engine to count events within a sliding window.
     */
    @Transactional(readOnly = true)
    public long countRecentEvents(Instant after) {
        return apiEventRepository.countByTimestampAfter(after);
    }

    /**
     * Helper for Rinku's detection engine to count specific status occurrences (e.g. 401s).
     */
    @Transactional(readOnly = true)
    public long countRecentFailedEvents(String endpoint, int statusCode, Instant after) {
        return apiEventRepository.countByEndpointAndStatusCodeAndTimestampAfter(endpoint, statusCode, after);
    }
}
