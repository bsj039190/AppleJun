package com.example.applejun.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountRequest {
    private String name;
    private String email;
    private String account;
    private String pwd;

    //사진 건너뜀
    private String connection;
    private LocalDate birthday;
}
