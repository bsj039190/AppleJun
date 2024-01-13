package com.example.applejun.service;

import com.example.applejun.dto.GpsDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GpsService {
    List<GpsDto> getGpsList(Pageable pageable);
    List<GpsDto> getGpsListByKeyword(String keyword, Pageable pageable);
    Long getGpsSize();
    Long getGoodsSizeByKeyword(String keyword);
    GpsDto getGps(Long id);
    void createGps(GpsDto gpsDto);
    void updateGps(Long id, GpsDto gpsDto);
    void deleteGps(Long id);
}
