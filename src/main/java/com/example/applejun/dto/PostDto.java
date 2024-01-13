package com.example.applejun.dto;

import com.example.applejun.entity.AccountEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
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
