package com.example.applejun.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileImageRequest {
    private String fileName;
    private String filePath;
    private Long account;

    /*public ProfileImageRequest(String fileName, Long account) {
        this.fileName = fileName;
        this.account = account;
    }*/
}
