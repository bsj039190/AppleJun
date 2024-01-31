package com.example.applejun.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {
    private String title;
    private Long uploader;
    private LocalDate date;
    private String content;
    private Long gps1;
    private Long gps2;
    private Long gps3;
    //private List<Long> gps;
    //사진업로드 해야됨
}
