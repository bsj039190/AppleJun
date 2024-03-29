package com.example.applejun.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "TB_POST")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "account_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private AccountEntity uploader;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String content;

    @JoinColumn(name = "gps_id1") //Cascade는 나중에 확인해보기
    @ManyToOne(fetch = FetchType.LAZY)
    private GpsEntity gps1;

    @JoinColumn(name = "gps_id2")
    @ManyToOne(fetch = FetchType.LAZY)
    private GpsEntity gps2;

    @JoinColumn(name = "gps_id3")
    @ManyToOne(fetch = FetchType.LAZY)
    private GpsEntity gps3;

}
