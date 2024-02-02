package com.example.applejun.controller;

import com.example.applejun.dto.ProfileImageDto;
import com.example.applejun.mapper.ProfileImageMapper;
import com.example.applejun.request.ProfileImageRequest;
import com.example.applejun.response.BaseResponse;
import com.example.applejun.response.BindingErrorResponse;
import com.example.applejun.service.ProfileImageService;
import com.example.applejun.service.serviceImpl.ProfileImageServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Validated
@RequiredArgsConstructor
@Slf4j
public class ProfileImageController {
    private final ProfileImageService profileImageService;

    @PostMapping("/image/upload")
    public ResponseEntity<BaseResponse> uploadImage(@RequestBody ProfileImageRequest profileImageRequest,
                                                    @RequestParam("file") MultipartFile file) {

        //리퀘스트를 넣으니까 에러가남 밑에 업로드 뉴는 잘됨

        log.debug("start upload profile image. request = {}", profileImageRequest);


        ProfileImageDto profileImageDto = ProfileImageMapper.INSTANCE.profileImageRequestToDto(profileImageRequest);

        profileImageService.uploadProfile(profileImageDto, file);

        log.debug("end upload profile image.");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), "success"));
    }

    @PostMapping(value = "/image/upload/new", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> uploadImageNew(@RequestParam("file") MultipartFile file) {
        log.debug("Ummmmmm");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), file.getOriginalFilename()));
    }
}
