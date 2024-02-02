package com.example.applejun.service;

import com.example.applejun.dto.ProfileImageDto;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileImageService {
    void uploadProfile(ProfileImageDto profileImageDto, MultipartFile file);
}
