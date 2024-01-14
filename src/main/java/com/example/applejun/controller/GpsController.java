package com.example.applejun.controller;

import com.example.applejun.dto.GpsDto;
import com.example.applejun.mapper.GpsMapper;
import com.example.applejun.request.AccountRequest;
import com.example.applejun.request.GpsRequest;
import com.example.applejun.response.BaseResponse;
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

    /*@GetMapping("/gps/get/list/{keyword}")
    public ResponseEntity<BaseResponse> getGpsListByKeyword() {

    }*/

    /*@GetMapping("/gps/size")
    public ResponseEntity<BaseResponse> getGpsSize() {

    }

    @GetMapping("/gps/size/{keyword}")
    public ResponseEntity<BaseResponse> getGpsSizeByKeyword() {

    }*/

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

    /*@PostMapping("/gps/create")
    public ResponseEntity<BaseResponse> createGps(@RequestBody @Validated GpsRequest gpsRequest,
                                                  BindingResult bindingResult) {

    }

    @PutMapping("/gps/update/{id}")
    public ResponseEntity<BaseResponse> updateGps(@PathVariable("id") @NotBlank String id,
                                                  @RequestBody @Validated GpsRequest gpsRequest,
                                                  BindingResult bindingResult) {

    }

    @DeleteMapping("/gps/delete/{id}")
    public ResponseEntity<BaseResponse> deleteGps(@PathVariable("id") @NotBlank String id) {

    }*/
}
