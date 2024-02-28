package com.example.applejun.service;

import com.example.applejun.dto.BackgroundImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BackgroundImageService {

    List<BackgroundImageDto> getBackgroundList(Long id);
    void uploadBackground(MultipartFile file, BackgroundImageDto backgroundImageDto);

    void updateBackground(Long backgroundImageId, MultipartFile file, BackgroundImageDto backgroundImageDto);

    void deleteBackground(Long backgroundImageId);
}
