package com.example.applejun.service;

import com.example.applejun.dto.PostDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {
    List<PostDto> getPostList(Pageable pageable);
    List<PostDto> getPostListByTitle(String title);
    Long getPostSize();
    PostDto getPost(Long id);
    void createPost(PostDto postDto);
    void updatePost(Long id, PostDto postDto);
    void deletePost(Long id);
}
