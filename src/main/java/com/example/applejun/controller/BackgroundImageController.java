package com.example.applejun.controller;

import com.example.applejun.dto.BackgroundImageDto;
import com.example.applejun.mapper.BackgroundImageMapper;
import com.example.applejun.request.BackgroundImageRequest;
import com.example.applejun.response.BackgroundImageResponse;
import com.example.applejun.response.BaseResponse;
import com.example.applejun.response.ContentsResponse;
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
import java.util.ArrayList;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@Slf4j
public class BackgroundImageController {

    private final BackgroundImageService backgroundImageService;

    @GetMapping(value = "/background/list/{id}") //해당하는 유저만 받아야하기 때문에 아이디를 받음
    public ResponseEntity<BaseResponse> getBackgroundList(@PathVariable("id") @NotBlank String id) {
        log.debug("start get Background list of {}", id);

        List<BackgroundImageDto> backgroundImageDtoList = backgroundImageService.getBackgroundList(Long.parseLong(id));

        List<BackgroundImageResponse> backgroundImageResponseList = new ArrayList<>();

        for (BackgroundImageDto backgroundImageDto : backgroundImageDtoList) {
            BackgroundImageResponse backgroundImageResponse = BackgroundImageMapper.INSTANCE.backgroundImageDtoToResponse(backgroundImageDto);
            backgroundImageResponseList.add(backgroundImageResponse);
        }

        ContentsResponse<List<BackgroundImageResponse>> response = new ContentsResponse<>(HttpStatus.OK.value(), "success",
                backgroundImageResponseList);
        log.debug("end get background list. uploader = {}", id);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

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

    @DeleteMapping(value = "/background/delete/{id}")
    public ResponseEntity<BaseResponse> deleteBackground(@PathVariable("id") @NotBlank String id) {
        log.debug("start delete background image. id = {}", id);

        backgroundImageService.deleteBackground(Long.parseLong(id));

        log.debug("end delete background image.");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), "success"));
    }
}
