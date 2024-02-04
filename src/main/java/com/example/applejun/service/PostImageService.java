package com.example.applejun.service;

import com.example.applejun.dto.PostImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostImageService {
    void uploadPostImage(List<MultipartFile> fileList, Long postId);
}
