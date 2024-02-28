package com.example.applejun.repository;

import com.example.applejun.entity.BackgroundImageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BackgroundImageRepository extends JpaRepository<BackgroundImageEntity, Long> {
    List<BackgroundImageEntity> findByUploader(@Param("uploader") Long uploader);
}
