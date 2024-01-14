package com.example.applejun.repository;

import com.example.applejun.entity.GpsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GpsRepository extends JpaRepository<GpsEntity, Long> {
    Page<GpsEntity> findByNameContains(@Param("subject") String subject, Pageable pageable);

    Long countBySubject(@Param("subject") String subject);
}
