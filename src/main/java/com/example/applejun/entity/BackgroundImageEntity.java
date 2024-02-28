package com.example.applejun.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "TB_BACKGROUND")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BackgroundImageEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String fileName;
    @Column(nullable = false)
    private String filePath;

    @Column(nullable = false)
    private Long uploader;
}
