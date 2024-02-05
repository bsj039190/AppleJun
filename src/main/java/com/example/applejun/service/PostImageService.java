package com.example.applejun.service;

import com.example.applejun.dto.PostImageDto;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostImageService {

    List<List<String>> getPostImageList(Pageable pageable);

    List<String> getPostImage(Long postId);

    void uploadPostImage(List<MultipartFile> fileList, Long postId);

    void updatePostImage(List<MultipartFile> fileList, Long postId);

    void deletePostImage(Long postId);
}
