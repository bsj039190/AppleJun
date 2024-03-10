package com.example.applejun.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "TB_ACCOUNT")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountEntity extends BaseEntity{

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

    @Column(nullable = false, length = 255)
    private String connection; //상대방의 account

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(length = 500)
    private String profileImage;

    // Spring Security에서 제공하는 BCryptPasswordEncoder를 사용하여 비밀번호 해싱
//    private PasswordEncoder passwordEncoder;
//
//    public void setPassword(String password) {
//        // 비밀번호를 해싱하여 저장
//        this.pwd = passwordEncoder.encode(password);
//    }
}
