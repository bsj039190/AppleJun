package com.example.applejun.controller;

import com.example.applejun.dto.PostDto;
import com.example.applejun.mapper.PostMapper;
import com.example.applejun.request.PostRequest;
import com.example.applejun.response.BaseResponse;
import com.example.applejun.response.BindingErrorResponse;
import com.example.applejun.response.ContentsResponse;
import com.example.applejun.response.PostResponse;
import com.example.applejun.service.PostImageService;
import com.example.applejun.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;

    private final PostImageService postImageService;

    //포스트맨 테스트 완료 --> 사진포함해서 테스트 해야됨
    @GetMapping("/post/get/list")
    public ResponseEntity<BaseResponse> getPostList(@PageableDefault(sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable) {
        log.debug("start get post list.");

        List<PostDto> postDtoList = postService.getPostList(pageable);

        List<PostResponse> postResponseList = new ArrayList<>();

        for (PostDto postDto : postDtoList) {
            PostResponse postResponse = PostMapper.INSTANCE.postDtoToResponse(postDto);
            postResponseList.add(postResponse);
        }

        ContentsResponse<List<PostResponse>> response = new ContentsResponse<>(HttpStatus.OK.value(),
                "success", postResponseList);

        log.debug("end get post list. post = {}", postResponseList);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/post/get/list/{title}")
    public ResponseEntity<BaseResponse> getPostListByTitle(@RequestParam("title") @NotNull String title,
                                                           @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        log.debug("start post get list by title. title = {}", title);

        List<PostDto> postDtoList = postService.getPostListByTitle(title, pageable);

        List<PostResponse> postResponseList = new ArrayList<>();

        for (PostDto postDto : postDtoList) {
            PostResponse postResponse = PostMapper.INSTANCE.postDtoToResponse(postDto);
            postResponseList.add(postResponse);
        }

        ContentsResponse<List<PostResponse>> response = new ContentsResponse<>(HttpStatus.OK.value(),
                "success", postResponseList);

        log.debug("end get post list by title.");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/post/size")
    public ResponseEntity<BaseResponse> getPostSize() {
        log.debug("start get post size.");

        Long postSize = postService.getPostSize();

        ContentsResponse<Long> response = new ContentsResponse<>(HttpStatus.OK.value(),
                "success", postSize);

        log.debug("end get post size.");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<BaseResponse> getPost(@PathVariable("id") @NotBlank String id) {
        log.debug("start get post. id = {}", id);

        PostDto postDto = postService.getPost(Long.parseLong(id));

        PostResponse postResponse = PostMapper.INSTANCE.postDtoToResponse(postDto);

        ContentsResponse<PostResponse> response = new ContentsResponse<>(HttpStatus.OK.value(),
                "success", postResponse);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //포스트맨 할때 어카운트 gps 다 선언하고서 해야됨
    //여기까지 완료됨, 업데이트랑 삭제, 불러오기도 진행해야함
    @PostMapping(value = "/post/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> createPost(@RequestPart("postRequest") @Validated PostRequest postRequest,
                                                   @RequestPart("fileList") List<MultipartFile> fileList,
                                                   BindingResult bindingResult) {
        log.debug("start create post. request = {}", postRequest);

        if (bindingResult.hasErrors()) {
            log.error("bind error. error = {}", bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BindingErrorResponse(bindingResult));
        }

        PostDto postDto = PostMapper.INSTANCE.postRequestToDto(postRequest);

        Long postId = postService.createPost(postDto);

        if (!fileList.isEmpty()) {
            postImageService.uploadPostImage(fileList, postId);
        }

        log.debug("end create post.");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), "success"));
    }

    @PutMapping("/post/update/{id}")
    public ResponseEntity<BaseResponse> updatePost(@PathVariable("id") @NotBlank String id,
                                                   @RequestBody @Validated PostRequest postRequest,
                                                   BindingResult bindingResult) {
        log.debug("start update post. request = {}", postRequest);

        if (bindingResult.hasErrors()) {
            log.error("bind error. error = {}", bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BindingErrorResponse(bindingResult));
        }

        PostDto postDto = PostMapper.INSTANCE.postRequestToDto(postRequest);

        postService.updatePost(Long.parseLong(id), postDto);

        log.debug("end update post.");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), "success"));
    }

    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity<BaseResponse> deletePost(@PathVariable("id") @NotBlank String id) {
        log.debug("start delete post. id = {}", id);

        postService.deletePost(Long.parseLong(id));

        log.debug("end delete post.");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), "success"));
    }

}
