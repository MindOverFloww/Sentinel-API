package com.sentinel.api.service;

import com.sentinel.api.dto.event.ApiEventResponse;
import com.sentinel.api.entity.ApiEvent;
import com.sentinel.api.repository.ApiEventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ApiEventServiceTest {

    @Mock
    private ApiEventRepository apiEventRepository;

    @InjectMocks
    private ApiEventService apiEventService;

    private ApiEvent sampleEvent;

    @BeforeEach
    void setUp() {
        sampleEvent = ApiEvent.builder()
                .id(1L)
                .timestamp(Instant.now())
                .method("GET")
                .endpoint("/api/demo/products")
                .statusCode(200)
                .responseTimeMs(45)
                .requestSizeBytes(0L)
                .responseSizeBytes(450L)
                .sourceIp("127.0.0.1")
                .userAgent("Mozilla/5.0")
                .authenticated(false)
                .build();
    }

    @Test
    @DisplayName("recordEvent persists event when valid metadata is provided")
    void recordEvent_ValidMetadata_PersistsSuccessfully() {
        when(apiEventRepository.save(any(ApiEvent.class))).thenReturn(sampleEvent);

        ApiEvent saved = apiEventService.recordEvent(sampleEvent);

        assertThat(saved).isNotNull();
        assertThat(saved.getId()).isEqualTo(1L);
        assertThat(saved.getEndpoint()).isEqualTo("/api/demo/products");
        verify(apiEventRepository).save(sampleEvent);
    }

    @Test
    @DisplayName("recordEvent automatically populates timestamp if null")
    void recordEvent_NullTimestamp_PopulatesTimestamp() {
        sampleEvent.setTimestamp(null);
        when(apiEventRepository.save(any(ApiEvent.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ApiEvent saved = apiEventService.recordEvent(sampleEvent);

        assertThat(saved.getTimestamp()).isNotNull();
        verify(apiEventRepository).save(any(ApiEvent.class));
    }

    @Test
    @DisplayName("recordEvent handles null event safely without throwing exception")
    void recordEvent_NullEvent_ReturnsNullSafely() {
        ApiEvent saved = apiEventService.recordEvent(null);

        assertThat(saved).isNull();
        verify(apiEventRepository, never()).save(any());
    }

    @Test
    @DisplayName("recordEvent handles repository exceptions safely without breaking caller")
    void recordEvent_RepositoryThrowsException_ReturnsNullWithoutThrowing() {
        when(apiEventRepository.save(any(ApiEvent.class))).thenThrow(new RuntimeException("Database error"));

        ApiEvent saved = apiEventService.recordEvent(sampleEvent);

        assertThat(saved).isNull();
    }

    @Test
    @DisplayName("getEvents returns newest-first paginated event list")
    void getEvents_ReturnsPaginatedEvents() {
        Page<ApiEvent> eventPage = new PageImpl<>(List.of(sampleEvent));
        when(apiEventRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(eventPage);

        Page<ApiEventResponse> result = apiEventService.getEvents(
                null, null, null, null, null, null, PageRequest.of(0, 20)
        );

        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getEndpoint()).isEqualTo("/api/demo/products");

        ArgumentCaptor<Pageable> pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        verify(apiEventRepository).findAll(any(Specification.class), pageableCaptor.capture());
        assertThat(pageableCaptor.getValue().getSort().getOrderFor("timestamp")).isNotNull();
    }

    @Test
    @DisplayName("getEvents throws IllegalArgumentException when from is after to")
    void getEvents_InvalidTimeRange_ThrowsException() {
        Instant from = Instant.now();
        Instant to = from.minusSeconds(3600);

        assertThatThrownBy(() -> apiEventService.getEvents(
                null, null, null, null, from, to, PageRequest.of(0, 20)
        )).isInstanceOf(IllegalArgumentException.class)
          .hasMessageContaining("'from' timestamp cannot be after 'to' timestamp");
    }
}
