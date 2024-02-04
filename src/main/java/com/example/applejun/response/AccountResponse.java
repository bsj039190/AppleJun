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
public class AccountResponse {
    private Long id;
    private String name;
    private String email;
    private String account;
    private String pwd;
    private String connection;
    private LocalDate birthday;
    private String profileImage;
}
