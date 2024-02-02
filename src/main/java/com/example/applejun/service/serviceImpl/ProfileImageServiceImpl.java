package com.example.applejun.service.serviceImpl;

import com.example.applejun.dto.ProfileImageDto;
import com.example.applejun.entity.ProfileImageEntity;
import com.example.applejun.mapper.ProfileImageMapper;
import com.example.applejun.repository.ProfileImageRepository;
import com.example.applejun.service.ProfileImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ProfileImageServiceImpl implements ProfileImageService {
    private final ProfileImageRepository profileImageRepository;

    @Override
    public void uploadProfile(ProfileImageDto profileImageDto, MultipartFile file) {

        try {
            String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";

            UUID uuid = UUID.randomUUID();
            String fileName = uuid + "_" + file.getOriginalFilename();
            File saveFile = new File(projectPath, fileName);

            file.transferTo(saveFile);

            ProfileImageEntity profileImageEntity = ProfileImageMapper.INSTANCE.profileImageDtoToEntity(profileImageDto);
            profileImageRepository.save(profileImageEntity);

        } catch (IOException e) {
            // IOException 처리
            e.printStackTrace(); // 또는 로깅 등 적절한 처리를 수행
            throw new RuntimeException("파일 전송 중 오류가 발생했습니다.");
        } catch (Exception e) {
            // 기타 예외 처리
            e.printStackTrace(); // 또는 로깅 등 적절한 처리를 수행
            throw new RuntimeException("프로필 이미지 업로드 중 오류가 발생했습니다.");
        }

    }
}