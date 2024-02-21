package com.example.applejun.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GpsResponse {
    private Long id;
    private String name;
    private double gpsLng;
    private double gpsLat;
    private String url;
    private String subject;
    private LocalDate date;
    private String address;
}
