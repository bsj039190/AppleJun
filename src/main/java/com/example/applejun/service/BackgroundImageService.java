package com.example.applejun.service;

import com.example.applejun.dto.BackgroundImageDto;
import org.springframework.web.multipart.MultipartFile;

public interface BackgroundImageService {
    void uploadBackground(MultipartFile file, BackgroundImageDto backgroundImageDto);

    void updateBackground(Long backgroundImageId, MultipartFile file, BackgroundImageDto backgroundImageDto);
}
