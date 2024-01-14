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
    //사진 일단 건너뜀
    private String connection;
    private LocalDate birthday;

}
