package com.sentinel.api.repository;

import com.sentinel.api.entity.ApiEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface ApiEventRepository extends JpaRepository<ApiEvent, Long>, JpaSpecificationExecutor<ApiEvent> {

    Page<ApiEvent> findAllByOrderByTimestampDesc(Pageable pageable);

    List<ApiEvent> findBySourceIpOrderByTimestampDesc(String sourceIp);

    List<ApiEvent> findByStatusCodeOrderByTimestampDesc(int statusCode);

    List<ApiEvent> findByEndpointOrderByTimestampDesc(String endpoint);

    long countByTimestampAfter(Instant after);

    long countByEndpointAndStatusCodeAndTimestampAfter(String endpoint, int statusCode, Instant after);
}
