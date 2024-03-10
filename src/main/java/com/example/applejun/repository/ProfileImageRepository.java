package com.example.applejun.repository;

import com.example.applejun.entity.AccountEntity;
import com.example.applejun.entity.ProfileImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProfileImageRepository extends JpaRepository<ProfileImageEntity, Long> {
    Optional<ProfileImageEntity> findByAccount( AccountEntity accountEntity);

    void deleteByAccount(AccountEntity accountEntity);
}
