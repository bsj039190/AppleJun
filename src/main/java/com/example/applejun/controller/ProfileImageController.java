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

import javax.validation.constraints.NotBlank;
import java.io.IOException;
import java.util.UUID;

@RestController
@Validated
@RequiredArgsConstructor
@Slf4j
public class ProfileImageController {
    private final ProfileImageService profileImageService;

    @PostMapping(value = "/profile/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> uploadProfile(@RequestParam("file") MultipartFile file,
                                                    @RequestPart("profileImageRequest") ProfileImageRequest profileImageRequest) throws IOException {

        log.debug("start upload profile image. request = {}", profileImageRequest);

        ProfileImageDto profileImageDto = ProfileImageMapper.INSTANCE.profileImageRequestToDto(profileImageRequest);

        profileImageService.uploadProfile(file, profileImageDto);

        log.debug("end upload profile image.");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), file.getOriginalFilename()));
    }

    @PutMapping(value = "/profile/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> updateProfile(@PathVariable("id") @NotBlank String id,
                                                      @RequestParam("file") MultipartFile file,
                                                      @RequestPart("profileImageRequest") ProfileImageRequest profileImageRequest) throws IOException {
        log.debug("start update profile image. request = {}", profileImageRequest);

        ProfileImageDto profileImageDto = ProfileImageMapper.INSTANCE.profileImageRequestToDto(profileImageRequest);

        //id는 업데이트한 어카운트의 Id임
        String uuidAndName = profileImageService.updateProfile(Long.parseLong(id), file, profileImageDto);

        log.debug("end update profile image.");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), uuidAndName));
    }

    /*@PostMapping(value = "/image/upload/new", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> uploadImageSec(@RequestParam("file") MultipartFile file,
                                                       @RequestParam("account") ProfileImageRequest profileImageRequest) {

        String uuid = UUID.randomUUID().toString();

        log.debug("start upload profile image. uuid = {}", uuid);

        profileImageService.uploadProfile(file, uuid);

        log.debug("end upload profile image.");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), file.getOriginalFilename()));
    }

    @PostMapping(value = "/image/upload/th", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> uploadImageThr(@RequestPart("file") MultipartFile file,
                                                    @RequestPart("profileImageRequest") ProfileImageRequest profileImageRequest) throws IOException {

        String uuid = UUID.randomUUID().toString();

        log.debug("start upload profile image. uuid = {}", uuid);
        log.debug("Um, {}", profileImageRequest.getFileName());

        profileImageService.uploadProfile(file, uuid);

        log.debug("end upload profile image.");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), file.getOriginalFilename()));
    }*/
}
