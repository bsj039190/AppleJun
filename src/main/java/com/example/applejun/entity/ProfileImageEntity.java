package com.example.applejun.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "TB_IMAGE")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProfileImageEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private String filePath;
    @JoinColumn(name = "account_id")
    @OneToOne(fetch = FetchType.LAZY)
    private AccountEntity account;
}
