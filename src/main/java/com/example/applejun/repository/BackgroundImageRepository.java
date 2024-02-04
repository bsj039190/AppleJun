package com.example.applejun.repository;

import com.example.applejun.entity.BackgroundImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackgroundImageRepository extends JpaRepository<BackgroundImageEntity, Long> {
}
