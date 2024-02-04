package com.example.applejun.controller;

import com.example.applejun.dto.BackgroundImageDto;
import com.example.applejun.mapper.BackgroundImageMapper;
import com.example.applejun.request.BackgroundImageRequest;
import com.example.applejun.response.BaseResponse;
import com.example.applejun.service.BackgroundImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

@RestController
@Validated
@RequiredArgsConstructor
@Slf4j
public class BackgroundImageController {

    private final BackgroundImageService backgroundImageService;

    @PostMapping(value = "/background/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> uploadBackground(@RequestParam("file")MultipartFile file,
                                                         @RequestPart("backgroundImageRequest")BackgroundImageRequest backgroundImageRequest) {
        log.debug("start upload background image. request = {}", backgroundImageRequest);

        BackgroundImageDto backgroundImageDto = BackgroundImageMapper.INSTANCE.backgroundImageRequestToDto(backgroundImageRequest);

        backgroundImageService.uploadBackground(file, backgroundImageDto);

        log.debug("end upload background image.");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), file.getOriginalFilename()));
    }

    @PutMapping(value = "/background/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> updateBackground(@PathVariable("id") @NotBlank String id,
                                                         @RequestParam("file")MultipartFile file,
                                                         @RequestPart("backgroundImageRequest")BackgroundImageRequest backgroundImageRequest) {
        log.debug("start update background image. request = {}", backgroundImageRequest);

        BackgroundImageDto backgroundImageDto = BackgroundImageMapper.INSTANCE.backgroundImageRequestToDto(backgroundImageRequest);

        backgroundImageService.updateBackground(Long.parseLong(id), file, backgroundImageDto);

        log.debug("end update background image.");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), file.getOriginalFilename()));
    }
}
