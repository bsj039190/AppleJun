package com.example.applejun.repository;

import com.example.applejun.entity.PostEntity;
import com.example.applejun.entity.PostImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostImageRepository extends JpaRepository<PostImageEntity, Long> {

    List<PostImageEntity> findByPostId(PostEntity postEntity);
}
