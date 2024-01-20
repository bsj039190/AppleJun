package com.example.applejun.service;

import com.example.applejun.dto.PostDto;
import com.example.applejun.entity.AccountEntity;
import com.example.applejun.entity.GpsEntity;
import com.example.applejun.entity.PostEntity;
import com.example.applejun.mapper.PostMapper;
import com.example.applejun.repository.PostRepository;
import com.example.applejun.service.serviceImpl.PostServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.samePropertyValuesAs;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class PostServiceTest {
    @Mock
    private PostRepository postRepository;
    @InjectMocks
    private PostServiceImpl postService;

    AccountEntity uploader = AccountEntity.builder()
            .id(12L)
            .build();

    GpsEntity gps = GpsEntity.builder().id(13L).build();

    private PostEntity initEntity(Long id) {
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        PostEntity postEntity = PostEntity.builder()
                .id(id)
                .uploader(uploader)
                .title("title")
                .date(localDate)
                .content("content")
                .gps1(gps)
                .gps2(null)
                .gps3(null)
                .build();
        return postEntity;
    }

    private PostDto initDto(Long id) {
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        PostDto postDto = PostDto.builder()
                .id(id)
                .uploader(12L)
                .title("title")
                .date(localDate)
                .content("content")
                .gps1(13L)
                .gps2(null)
                .gps3(null)
                .build();
        return postDto;
    }

    @Test
    public void getPostListTest() throws Exception {
        Pageable pageable = PageRequest.of(0, 1);

        PostEntity postEntity = initEntity(1L);
        PostEntity postEntity1 = initEntity(2L);
        List<PostEntity> postEntityList = new ArrayList<>();
        postEntityList.add(postEntity);
        postEntityList.add(postEntity1);
        Page<PostEntity> postEntityPage = new PageImpl<>(postEntityList);

        List<PostDto> postDtoList = new ArrayList<>();

        for (PostEntity postE : postEntityList) {
            PostDto postDto = PostMapper.INSTANCE.postEntityToDto(postE);
            postDtoList.add(postDto);
        }

        when(postRepository.findAll(pageable)).thenReturn(postEntityPage);

        List<PostDto> expect = postService.getPostList(pageable);

        assertThat(expect, samePropertyValuesAs(postDtoList));
    }

    @Test
    public void getPostListByTitleTest() throws Exception {
        Pageable pageable = PageRequest.of(0, 1);

        PostEntity postEntity = initEntity(1L);
        PostEntity postEntity1 = initEntity(2L);
        List<PostEntity> postEntityList = new ArrayList<>();
        postEntityList.add(postEntity);
        postEntityList.add(postEntity1);
        Page<PostEntity> postEntityPage = new PageImpl<>(postEntityList);

        List<PostDto> postDtoList = new ArrayList<>();

        for (PostEntity postE : postEntityList) {
            PostDto postDto = PostMapper.INSTANCE.postEntityToDto(postE);
            postDtoList.add(postDto);
        }

        when(postRepository.findByTitle(any(), any())).thenReturn(postEntityPage);

        List<PostDto> expect = postService.getPostListByTitle("title", pageable);

        assertThat(expect, samePropertyValuesAs(postDtoList));
    }

    @Test
    public void getPostSizeTest() throws Exception {
        Long size = 5L;

        when(postRepository.count()).thenReturn(size);

        Long expect = postService.getPostSize();

        assertThat(expect, samePropertyValuesAs(size));
    }

    @Test
    public void getPostTest() throws Exception {
        PostEntity postEntity = initEntity(1L);
        Optional<PostEntity> post = Optional.of(postEntity);

        PostDto postDto = PostMapper.INSTANCE.postEntityToDto(postEntity);

        when(postRepository.findById(any())).thenReturn(post);

        PostDto expect = postService.getPost(1L);

        assertThat(expect, samePropertyValuesAs(postDto));
    }

    @Test
    public void createPostTest() throws Exception {
        PostEntity postEntity = initEntity(1L);
        PostDto postDto = initDto(1L);

        when(postRepository.save(any())).thenReturn(postEntity);

        assertDoesNotThrow(() -> postService.createPost(postDto));
    }

    @Test
    public void updatePostTest() throws Exception {
        Long id = 1L;
        PostDto postDto = initDto(1L);
        PostEntity postEntity = initEntity(1L);

        when(postRepository.save(any())).thenReturn(postEntity);
        Optional<PostEntity> post = Optional.of(postEntity);
        when(postRepository.findById(any())).thenReturn(post);

        assertDoesNotThrow(() -> postService.updatePost(id, postDto));
    }

    @Test
    public void deletePostTest() throws Exception {
        Long id = 1L;

        PostEntity postEntity = initEntity(1L);

        doNothing().when(postRepository).deleteById(any());
        Optional<PostEntity> post = Optional.of(postEntity);
        when(postRepository.findById(any())).thenReturn(post);

        assertDoesNotThrow(() -> postService.deletePost(id));
    }
}
