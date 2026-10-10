package com.sentinel.api.service;

import com.sentinel.api.entity.ApiEvent;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.time.Instant;

/**
 * Filter that captures security metadata for monitored Demo API requests (/api/demo/**).
 *
 * Guarantees:
 * 1. Executes exactly once per request.
 * 2. Only filters /api/demo/** traffic (avoids recursive logging of /api/events).
 * 3. Preserves response bodies via ContentCachingResponseWrapper and copyBodyToResponse().
 * 4. Captures real status codes (including 400, 401, 404).
 * 5. Never logs raw credentials or sensitive payload strings.
 * 6. Checks Spring Security context to determine actual authentication state.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 50)
public class ApiEventLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(ApiEventLoggingFilter.class);
    private static final String MONITORED_PATH_PREFIX = "/api/demo";

    private final ApiEventService apiEventService;

    public ApiEventLoggingFilter(ApiEventService apiEventService) {
        this.apiEventService = apiEventService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path == null || !path.startsWith(MONITORED_PATH_PREFIX);
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        Instant requestTime = Instant.now();
        long startNano = System.nanoTime();

        ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);

        int statusCode = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;

        try {
            filterChain.doFilter(requestWrapper, responseWrapper);
            statusCode = responseWrapper.getStatus();
        } catch (Exception ex) {
            statusCode = responseWrapper.getStatus() != 0 ? responseWrapper.getStatus() : HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
            throw ex;
        } finally {
            long durationMs = (System.nanoTime() - startNano) / 1_000_000;

            long requestSize = determineRequestSize(requestWrapper);
            long responseSize = responseWrapper.getContentSize();

            String clientIp = extractClientIp(request);
            String userAgent = sanitizeUserAgent(request.getHeader("User-Agent"));
            boolean isAuthenticated = checkAuthenticationState();

            ApiEvent event = ApiEvent.builder()
                    .timestamp(requestTime)
                    .method(request.getMethod())
                    .endpoint(request.getRequestURI())
                    .statusCode(statusCode)
                    .responseTimeMs(Math.max(1, durationMs))
                    .requestSizeBytes(requestSize >= 0 ? requestSize : 0L)
                    .responseSizeBytes(responseSize)
                    .sourceIp(clientIp)
                    .userAgent(userAgent)
                    .authenticated(isAuthenticated)
                    .build();

            // Safe persistence: database logging errors will not fail the client HTTP response
            try {
                apiEventService.recordEvent(event);
            } catch (Exception e) {
                log.error("Failed to record API event: {}", e.getMessage());
            }

            // Copy cached response content back to the client stream
            responseWrapper.copyBodyToResponse();
        }
    }

    private long determineRequestSize(ContentCachingRequestWrapper requestWrapper) {
        long contentLength = requestWrapper.getContentLengthLong();
        if (contentLength >= 0) {
            return contentLength;
        }
        byte[] cached = requestWrapper.getContentAsByteArray();
        return cached != null ? cached.length : 0L;
    }

    private String extractClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            String[] parts = forwarded.split(",");
            String clientIp = parts[0].trim();
            if (!clientIp.equalsIgnoreCase("unknown")) {
                return clientIp;
            }
        }

        String remoteAddr = request.getRemoteAddr();
        if ("0:0:0:0:0:0:0:1".equals(remoteAddr)) {
            return "127.0.0.1";
        }
        return remoteAddr != null ? remoteAddr : "unknown";
    }

    private String sanitizeUserAgent(String userAgent) {
        if (userAgent == null) {
            return "unknown";
        }
        return userAgent.length() > 500 ? userAgent.substring(0, 500) : userAgent;
    }

    private boolean checkAuthenticationState() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken);
    }
}
