package com.example.applejun.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

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
    private List<Long> gps;

    //사진 일단 건너뜀
}
