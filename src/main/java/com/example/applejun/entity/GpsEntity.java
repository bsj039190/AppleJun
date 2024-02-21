package com.example.applejun.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "TB_GPS")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GpsEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String name;

    @Column
    private double gpsLng;

    @Column
    private double gpsLat;

    @Column(nullable = false, length = 255)
    private String url;

    @Column(length = 50)
    private String subject;

    @Column
    private LocalDate date;

    @Column(nullable = false)
    private String address;
}
