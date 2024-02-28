package com.example.applejun.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BackgroundImageDto {
    private Long id;
    private String fileName;
    private String filePath;
    private Long uploader;
}
