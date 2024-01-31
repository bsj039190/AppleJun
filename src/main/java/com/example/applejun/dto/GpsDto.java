package com.example.applejun.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GpsDto {
    private Long id;
    private String name;
    private double gpsLng;
    private double gpsLat;
    private String url;
    private String subject;
    private LocalDate date;
    //private Long post;
}
