package com.example.applejun.service;

import com.example.applejun.dto.ProfileImageDto;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileImageService {
    void uploadProfile(MultipartFile file, ProfileImageDto profileImageDto);

    String updateProfile(Long profileImageId, MultipartFile file, ProfileImageDto profileImageDto);
}
