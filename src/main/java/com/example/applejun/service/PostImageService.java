package com.example.applejun.service;

import com.example.applejun.dto.PostImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostImageService {

    List<byte[]> getPostImageList(Long postId);

    void uploadPostImage(List<MultipartFile> fileList, Long postId);

    void updatePostImage(List<MultipartFile> fileList, Long postId);

    void deletePostImage(Long postId);
}
