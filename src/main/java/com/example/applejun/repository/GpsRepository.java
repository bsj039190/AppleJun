package com.example.applejun.repository;

import com.example.applejun.entity.GpsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GpsRepository extends JpaRepository<GpsEntity, Long> {

}
