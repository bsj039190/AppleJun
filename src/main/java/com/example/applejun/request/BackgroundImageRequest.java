package com.example.applejun.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BackgroundImageRequest {
    private String fileName;
    private String filePath;
    private Long uploader;
}
