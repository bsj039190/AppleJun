package com.example.applejun;
import com.example.applejun.entity.AccountEntity;
import com.example.applejun.entity.GpsEntity;
import com.example.applejun.entity.PostEntity;
import com.example.applejun.repository.AccountRepository;
import com.example.applejun.repository.GpsRepository;
import com.example.applejun.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;
    private final GpsRepository gpsRepository;

    LocalDate localDate = LocalDate.of(2023, 1, 1);

    public DataLoader(PostRepository postRepository, AccountRepository accountRepository, GpsRepository gpsRepository) {
        this.postRepository = postRepository;
        this.accountRepository = accountRepository;
        this.gpsRepository = gpsRepository;
    }
    @Override
    public void run(String... args) throws Exception {
        AccountEntity testAccount = new AccountEntity(1L, "bsj039190@gmail.com", "bsj", "3919", "su", localDate);
        GpsEntity testGps1 = new GpsEntity(1L, "cafe1", 24.225, -24.225, "naverUrl", "cafe", localDate, 1L);
        GpsEntity testGps2 = new GpsEntity(2L, "cafe2", 24.225, -24.225, "naverUrl", "cafe", localDate, 1L);
        GpsEntity testGps3 = new GpsEntity(3L, "cafe2", 24.225, -24.225, "naverUrl", "cafe", localDate, 1L);
        List<GpsEntity> gpsEntityList = new ArrayList<>();
        gpsEntityList.add(testGps1);
        gpsEntityList.add(testGps2);
        gpsEntityList.add(testGps3);
        PostEntity testPost = new PostEntity(1L, testAccount, "title", localDate, "contents", gpsEntityList);


        accountRepository.save(testAccount);
        gpsRepository.save(testGps1);
        gpsRepository.save(testGps2);
        gpsRepository.save(testGps3);
        postRepository.save(testPost);

    }
}


//리스트에 외래키를 빼버리고 그냥 아이디값만 받고서 일별로 검색해서 정렬하는식으로 해도 될거같음