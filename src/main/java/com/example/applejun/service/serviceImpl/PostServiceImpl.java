package com.example.applejun.service.serviceImpl;

import com.example.applejun.dto.PostDto;
import com.example.applejun.entity.PostEntity;
import com.example.applejun.mapper.PostMapper;
import com.example.applejun.repository.PostRepository;
import com.example.applejun.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    @Override
    public List<PostDto> getPostList(Pageable pageable) {
        Page<PostEntity> postEntityPage = postRepository.findAll(pageable);

        List<PostDto> postDtoList = new ArrayList<>();

        for (PostEntity postEntity : postEntityPage) {
            PostDto postDto = PostMapper.INSTANCE.postEntityToDto(postEntity);
            postDtoList.add(postDto);
        }

        return postDtoList;
    }

    @Override
    public List<PostDto> getPostListByTitle(String title, Pageable pageable) {
        Page<PostEntity> postEntityPage = postRepository.findByTitle(title, pageable);

        List<PostDto> postDtoList = new ArrayList<>();

        for (PostEntity postEntity : postEntityPage) {
            PostDto postDto = PostMapper.INSTANCE.postEntityToDto(postEntity);
            postDtoList.add(postDto);
        }

        return postDtoList;
    }

    @Override
    public Long getPostSize() {
        Long postSize = postRepository.count();
        return postSize;
    }

    @Override
    public PostDto getPost(Long id) {
        Optional<PostEntity> post = postRepository.findById(id);
        PostEntity postEntity = post.orElseThrow(() -> new RuntimeException("post not found."));

        PostDto postDto = PostMapper.INSTANCE.postEntityToDto(postEntity);

        return postDto;
    }

    @Override
    public void createPost(PostDto postDto) {
        PostEntity postEntity = PostMapper.INSTANCE.postDtoToEntity(postDto);

        if (postRepository.save(postEntity) == null) {
            throw new RuntimeException("post not found.");
        }
    }

    @Override
    public void updatePost(Long id, PostDto postDto) {
        if (!postRepository.findById(id).isPresent()) {
            throw new RuntimeException("post not found.");
        }

        postDto.setId(id);
        PostEntity postEntity = PostMapper.INSTANCE.postDtoToEntity(postDto);

        postRepository.save(postEntity);
    }

    @Override
    public void deletePost(Long id) {
        if (!postRepository.findById(id).isPresent()) {
            throw new RuntimeException("post not found.");
        }

        postRepository.deleteById(id);
    }

}
