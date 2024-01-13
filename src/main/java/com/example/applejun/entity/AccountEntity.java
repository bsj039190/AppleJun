package com.example.applejun.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "TB_ACCOUNT")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String name;

    @Email
    @Column(nullable = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String account; //로그인시 아이디

    @Column(nullable = false, length = 255)
    private String pwd;

    //사진은 일단 건너뜀, 사진 엔티티 따로 만들어서 외래키로 할수도 있음

    @Column(nullable = false, length = 255)
    private String connection; //상대방의 account

    @Column(nullable = false)
    private LocalDate birthday;
    
}
