package com.example.applejun.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {
    private Long id;
    private String name;
    private String email;
    private String account;
    private String pwd;
    private String connection;
    private LocalDate birthday;

    private String profileImage;

}
