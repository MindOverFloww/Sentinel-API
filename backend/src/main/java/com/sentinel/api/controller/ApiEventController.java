package com.sentinel.api.controller;

import com.sentinel.api.dto.event.ApiEventResponse;
import com.sentinel.api.service.ApiEventService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/events")
public class ApiEventController {

    private static final int DEFAULT_PAGE = 0;
    private static final int DEFAULT_SIZE = 20;
    private static final int MAX_SIZE = 100;

    private final ApiEventService apiEventService;

    public ApiEventController(ApiEventService apiEventService) {
        this.apiEventService = apiEventService;
    }

    /**
     * Retrieve persisted API events with pagination and optional multi-field filtering.
     * Newest events are returned first by default.
     */
    @GetMapping
    public ResponseEntity<Page<ApiEventResponse>> getEvents(
            @RequestParam(required = false) String method,
            @RequestParam(required = false) String endpoint,
            @RequestParam(required = false) Integer statusCode,
            @RequestParam(required = false) String sourceIp,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        int validatedPage = Math.max(DEFAULT_PAGE, page);
        int validatedSize = Math.min(Math.max(1, size), MAX_SIZE);

        Pageable pageable = PageRequest.of(validatedPage, validatedSize);

        Page<ApiEventResponse> events = apiEventService.getEvents(
                method,
                endpoint,
                statusCode,
                sourceIp,
                from,
                to,
                pageable
        );

        return ResponseEntity.ok(events);
    }
}
