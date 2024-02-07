package com.example.applejun.controller;

import com.example.applejun.dto.PostDto;
import com.example.applejun.request.PostRequest;
import com.example.applejun.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.swing.plaf.SpinnerUI;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class PostControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @MockBean
    PostService postService;

    @Test
    public void getPostListTest() throws Exception {
        List<PostDto> postDtoList = new ArrayList<>();
        PostDto postDto = new PostDto();
        postDto.setId(1L);
        PostDto postDto1 = new PostDto();
        postDto1.setId(2L);
        postDtoList.add(postDto);
        postDtoList.add(postDto1);

        when(postService.getPostList(any())).thenReturn(postDtoList);

        mockMvc.perform(MockMvcRequestBuilders.get("/post/get/list"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[0].id").value(1L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[1].id").value(2L));
    }

    @Test
    public void getPostListByTitle() throws Exception {
        String title = "title";
        Pageable pageable = PageRequest.of(0, 10);

        List<PostDto> postDtoList = new ArrayList<>();
        PostDto postDto = new PostDto();
        postDto.setId(1L);
        PostDto postDto1 = new PostDto();
        postDto1.setId(2L);
        postDtoList.add(postDto);
        postDtoList.add(postDto1);

        when(postService.getPostListByTitle(any(), any())).thenReturn(postDtoList);

        mockMvc.perform(MockMvcRequestBuilders.get("/post/get/list/{title}", title)
                        .param("title", title)
                        .param("page", String.valueOf(pageable.getPageNumber()))
                        .param("size", String.valueOf(pageable.getPageSize())))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[0].id").value(1L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[1].id").value(2L));
    }

    @Test
    public void getPostSizeTest() throws Exception {
        Long size = 5L;

        when(postService.getPostSize()).thenReturn(size);

        mockMvc.perform(MockMvcRequestBuilders.get("/post/size"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contents").value(5L));
    }

    @Test
    public void getPostTest() throws Exception {
        String id = "1";
        PostDto postDto = new PostDto();
        postDto.setId(1L);

        when(postService.getPost(any())).thenReturn(postDto);

        mockMvc.perform(MockMvcRequestBuilders.get("/post/{id}", id))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contents.id").value(1L));
    }

    /*@Test
    public void createPostTest() throws Exception {
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        PostRequest postRequest = new PostRequest("title", 5L, localDate, "content", 5L, 5L, 5L);
        PostDto postDto = new PostDto();
        postDto.setId(1L);

        String requestString = objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(postRequest);

        doNothing().when(postService).createPost(any());

        mockMvc.perform(MockMvcRequestBuilders.post("/post/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(201))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"));
    }

    @Test
    public void updatePostTest() throws Exception {
        String id = "1";
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        PostRequest postRequest = new PostRequest("title", 5L, localDate, "content", 5L, 5L, 5L);

        String requestString = objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(postRequest);

        doNothing().when(postService).updatePost(any(), any());

        mockMvc.perform(MockMvcRequestBuilders.put("/post/update/{id}", id)
                .content(requestString)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"));
    }*/

    @Test
    public void deletePostTest() throws Exception {
        String id = "1";

        doNothing().when(postService).deletePost(any());

        mockMvc.perform(MockMvcRequestBuilders.delete("/post/delete/{id}", id))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"));
    }
}
