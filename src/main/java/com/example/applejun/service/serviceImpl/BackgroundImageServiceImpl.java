package com.example.applejun.service.serviceImpl;

import com.example.applejun.dto.BackgroundImageDto;
import com.example.applejun.entity.BackgroundImageEntity;
import com.example.applejun.mapper.BackgroundImageMapper;
import com.example.applejun.repository.BackgroundImageRepository;
import com.example.applejun.service.BackgroundImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class BackgroundImageServiceImpl implements BackgroundImageService {

    public final BackgroundImageRepository backgroundImageRepository;

    private final String UPLOAD_DIR = "src/main/resources/static/files/uploads/background-images/";

    @Override
    public void uploadBackground(MultipartFile file, BackgroundImageDto backgroundImageDto) {
        try {
            //업로드 할 디렉토리 생성
            String uuid = UUID.randomUUID().toString();

            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            log.debug("Um");

            //저장경로 설정
            String filePath = UPLOAD_DIR + uuid + "_" + file.getOriginalFilename();
            File dest = new File(filePath);

            //파일 복사
            FileCopyUtils.copy(file.getBytes(), dest);

            //엔티티 생성 및 검색을 위해서 패스 수정
            backgroundImageDto.setFilePath(filePath);
            BackgroundImageEntity backgroundImageEntity = BackgroundImageMapper.INSTANCE.backgroundImageDtoToEntity(backgroundImageDto);

            if (backgroundImageRepository.save(backgroundImageEntity) == null) {
                throw new RuntimeException("backgroundImage save failed.");
            }

            log.debug("success save background image, id = {}", backgroundImageEntity.getId());

            //백그라운드 이미지는 엮여있는 외래키가 없기 때문에 어카운트에 넣거나 안해도 됨

            log.debug("background filePath = {}", backgroundImageDto.getFilePath());


        } catch (IOException e) {
            // 파일 저장 중 에러 발생 시 예외 처리
            e.printStackTrace();
            throw new RuntimeException("Failed to upload profile image.");
        }
    }

    @Override
    public void updateBackground(Long backgroundImageId, MultipartFile file, BackgroundImageDto backgroundImageDto){
        log.debug("start update background image, id = {}", backgroundImageId);

        try {
            //기존 이미지 검색
            Optional<BackgroundImageEntity> existingBackgroundImageOptional = backgroundImageRepository.findById(backgroundImageId);
            if (!existingBackgroundImageOptional.isPresent()) {
                throw new RuntimeException("background image not found.");
            }

            BackgroundImageEntity existingImage = existingBackgroundImageOptional.get();

            //업로드 디렉토리 생성
            String uuid = UUID.randomUUID().toString();
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            //새로운 파일 저장 경로 설정
            String filePath = UPLOAD_DIR + uuid + "_" + file.getOriginalFilename();
            File newFile = new File(filePath);

            //파일 복사
            FileCopyUtils.copy(file.getBytes(), newFile);

            //배경 이미지 정보 업데이트
            backgroundImageDto.setId(backgroundImageId);
            backgroundImageDto.setFilePath(filePath);
            BackgroundImageEntity backgroundImageEntity = BackgroundImageMapper.INSTANCE.backgroundImageDtoToEntity(backgroundImageDto);

            //기존 사진 삭제(물리)
            Path existingFilePath = Paths.get(existingImage.getFilePath());
            Files.delete(existingFilePath);

            //새로운 값 저장 --> 위에다가 세이브 하면 그 파일이 기존사진으로 취급됨
            backgroundImageRepository.save(backgroundImageEntity);

            log.debug("background image updated success, id = {}", backgroundImageId);

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update profile image.");
        }
    }
}
