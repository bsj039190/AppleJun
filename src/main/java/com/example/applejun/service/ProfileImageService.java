package com.example.applejun.service;

import com.example.applejun.dto.ProfileImageDto;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileImageService {
    void uploadProfile(MultipartFile file, String uuid);

    //byte[] getProfileImage(String fileName);
}
