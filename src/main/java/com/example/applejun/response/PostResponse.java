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
public class PostResponse {
    private Long id;
    private String title;
    private Long uploader;
    private LocalDate date;
    private String content;
    private Long gps1;
    private Long gps2;
    private Long gps3;

    //사진 일단 건너뜀
}
