package com.example.applejun.controller;

import com.example.applejun.dto.GpsDto;
import com.example.applejun.mapper.GpsMapper;
import com.example.applejun.request.AccountRequest;
import com.example.applejun.request.GpsRequest;
import com.example.applejun.response.BaseResponse;
import com.example.applejun.response.BindingErrorResponse;
import com.example.applejun.response.ContentsResponse;
import com.example.applejun.response.GpsResponse;
import com.example.applejun.service.GpsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@Slf4j
public class GpsController {
    private final GpsService gpsService;

    @GetMapping("gps/get/list")
    public ResponseEntity<BaseResponse> getGpsList(@PageableDefault (sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable) {
        log.debug("start get gps list.");

        List<GpsDto> gpsDtoList = gpsService.getGpsList(pageable);

        List<GpsResponse> gpsResponseList = new ArrayList<>();

        for (GpsDto gpsDto : gpsDtoList) {
            GpsResponse gpsResponse = GpsMapper.INSTANCE.gpsDtoToResponse(gpsDto);
            gpsResponseList.add(gpsResponse);
        }

        ContentsResponse<List<GpsResponse>> response = new ContentsResponse<>(HttpStatus.OK.value(),
                "success", gpsResponseList);

        log.debug("end get gps list. gps = {}", gpsResponseList);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/gps/get/list/{subject}")
    public ResponseEntity<BaseResponse> getGpsListBySubject(@RequestParam("subject") @NotNull String subject,
                                                            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        log.debug("start get gps list by keyword. keyword = {}", subject);

        List<GpsDto> gpsDtoList = gpsService.getGpsListBySubject(subject, pageable);

        List<GpsResponse> gpsResponseList = new ArrayList<>();

        for (GpsDto gpsDto : gpsDtoList) {
            GpsResponse gpsResponse = GpsMapper.INSTANCE.gpsDtoToResponse(gpsDto);
            gpsResponseList.add(gpsResponse);
        }

        ContentsResponse<List<GpsResponse>> response = new ContentsResponse<>(HttpStatus.OK.value(), "success",
                gpsResponseList);

        log.debug("end get gps list by keyword.");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/gps/size")
    public ResponseEntity<BaseResponse> getGpsSize() {
        log.debug("start get gps size");

        Long gpsSize = gpsService.getGpsSize();

        ContentsResponse<Long> response = new ContentsResponse<>(HttpStatus.OK.value(), "success",
                gpsSize);

        log.debug("end get gps size");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/gps/size/{subject}")
    public ResponseEntity<BaseResponse> getGpsSizeBySubject(@RequestParam("subject") @NotNull String subject) {
        log.debug("start get gps size by subject. subject={}", subject);

        Long gpsSize = gpsService.getGpsSizeBySubject(subject);

        ContentsResponse<Long> response = new ContentsResponse<>(HttpStatus.OK.value(), "success",
                gpsSize);

        log.debug("end get gps size by subject. subject={}", subject);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/gps/{id}")
    public ResponseEntity<BaseResponse> getGps(@PathVariable("id") @NotBlank String id) {
        log.debug("start get gps. id = {}", id);

        GpsDto gpsDto = gpsService.getGps(Long.parseLong(id));

        GpsResponse gpsResponse = GpsMapper.INSTANCE.gpsDtoToResponse(gpsDto);

        ContentsResponse<GpsResponse> response = new ContentsResponse<>(HttpStatus.OK.value(), "success",
                gpsResponse);

        log.debug("end get gps. gps = {}", gpsResponse);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/gps/create")
    public ResponseEntity<BaseResponse> createGps(@RequestBody @Validated GpsRequest gpsRequest,
                                                  BindingResult bindingResult) {
        log.debug("start create gps. request = {}", gpsRequest);

        if (bindingResult.hasErrors()) {
            log.error("bind error. error = {}", bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BindingErrorResponse(bindingResult));
        }

        GpsDto gpsDto = GpsMapper.INSTANCE.gpsRequestToDto(gpsRequest);

        gpsService.createGps(gpsDto);

        log.debug("end create gps.");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), "success"));
    }

    @PutMapping("/gps/update/{id}")
    public ResponseEntity<BaseResponse> updateGps(@PathVariable("id") @NotBlank String id,
                                                  @RequestBody @Validated GpsRequest gpsRequest,
                                                  BindingResult bindingResult) {
        log.debug("start update gps. request = {}", gpsRequest);

        if (bindingResult.hasErrors()) {
            log.error("bind error. error = {}", bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BindingErrorResponse(bindingResult));
        }

        GpsDto gpsDto = GpsMapper.INSTANCE.gpsRequestToDto(gpsRequest);

        gpsService.updateGps(Long.parseLong(id), gpsDto);

        log.debug("end update gps.");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), "success"));
    }

    @DeleteMapping("/gps/delete/{id}")
    public ResponseEntity<BaseResponse> deleteGps(@PathVariable("id") @NotBlank String id) {
        log.debug("start delete gps. id = {}", id);

        gpsService.deleteGps(Long.parseLong(id));

        log.debug("end delete gps.");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), "success"));
    }
}
