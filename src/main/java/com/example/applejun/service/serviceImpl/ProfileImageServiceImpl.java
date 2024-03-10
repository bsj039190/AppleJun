package com.example.applejun.service.serviceImpl;

import com.example.applejun.dto.AccountDto;
import com.example.applejun.dto.ProfileImageDto;
import com.example.applejun.entity.AccountEntity;
import com.example.applejun.entity.ProfileImageEntity;
import com.example.applejun.mapper.AccountMapper;
import com.example.applejun.mapper.ProfileImageMapper;
import com.example.applejun.repository.AccountRepository;
import com.example.applejun.repository.ProfileImageRepository;
import com.example.applejun.service.ProfileImageService;
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
public class ProfileImageServiceImpl implements ProfileImageService {
    private final ProfileImageRepository profileImageRepository;

    private final AccountRepository accountRepository;

    private final String UPLOAD_DIR = "src/frontend/applejun/public/profile-image/";


    //업로드프로필 예전함수들
    /*@Override
    public void uploadProfileOld(ProfileImageDto profileImageDto, MultipartFile file) {

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

    @Override
    public void uploadProfile(MultipartFile file, String uuid) {
        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";

        String fileName = uuid + "_" + file.getOriginalFilename();
        File saveFile = new File(projectPath, fileName);

        file.transferTo(saveFile);

        profileImageRepository.save();

    }*/

    @Override
    public void uploadProfile(MultipartFile file, ProfileImageDto profileImageDto) {

        log.debug("Ummmmmmmmm");

        try {
            // 업로드할 디렉토리 생성
            String uuid = UUID.randomUUID().toString();

            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            log.debug("Junnnnnn");

            // 파일 저장 경로 설정
            String filePath = UPLOAD_DIR + uuid + "_" + file.getOriginalFilename();
            File dest = new File(filePath);

            log.debug("Sikkkkkk");

            // 파일 복사
            FileCopyUtils.copy(file.getBytes(), dest);

            //profileImageEntity 생성
            profileImageDto.setFilePath(filePath);
            ProfileImageEntity profileImageEntity = ProfileImageMapper.INSTANCE.profileImageDtoToEntity(profileImageDto);

            if (profileImageRepository.save(profileImageEntity) == null) {
                throw new RuntimeException("profileImage save failed.");
            }
            log.debug("success save profile image, id = {}", profileImageEntity.getId());

            //dto내용 어카운트에 넣기
            Long accountId = profileImageDto.getAccount();

            Optional<AccountEntity> accountEntityOptional = accountRepository.findById(accountId);
            AccountEntity accountEntity = accountEntityOptional.orElse(null);
            if (accountEntity == null) {
                log.debug("account not found. account id = {}", accountId);
                throw new RuntimeException("account not found. account id = {}");
            }

            AccountDto accountDto = AccountMapper.INSTANCE.accountEntityToDto(accountEntity);
            accountDto.setProfileImage(profileImageDto.getFileName());
            AccountEntity newAccountEntity = AccountMapper.INSTANCE.accountDtoToEntity(accountDto);

            accountRepository.save(accountEntity);



            log.debug("is alive");
            log.debug("profile filePath = {}", profileImageEntity.getFilePath());

            // 여기에서 필요한 추가 로직을 수행할 수 있습니다. (예: 데이터베이스에 파일 경로 저장 등)
        } catch (IOException e) {
            // 파일 저장 중 에러 발생 시 예외 처리
            e.printStackTrace();
            throw new RuntimeException("Failed to upload profile image.");
        }
    }

    @Override
    public void updateProfile(Long accountId, MultipartFile file, ProfileImageDto profileImageDto) {
        log.debug("start update profile, id = {}", accountId);

        try {
            //AccountId로 AccountEntity 검색
            AccountEntity accountEntity = accountRepository.findById(accountId)
                    .orElseThrow(() -> new RuntimeException("No value present"));

            //기존의 이미지 검색
            Optional<ProfileImageEntity> existingProfileImageOptional = profileImageRepository.findByAccount(accountEntity);
            if (!existingProfileImageOptional.isPresent()) {
                throw new RuntimeException("profile image not found.");
            }

            ProfileImageEntity existingProfileImage = existingProfileImageOptional.get();

            // 업로드할 디렉토리 생성
            String uuid = UUID.randomUUID().toString();
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // 새로운 파일 저장 경로 설정
            String filePath = UPLOAD_DIR + uuid + "_" + file.getOriginalFilename();
            File newFile = new File(filePath);

            // 파일 복사
            FileCopyUtils.copy(file.getBytes(), newFile);

            // 프로필 이미지 정보 업데이트
            //profileImageDto.setId(profileImageId);
            profileImageDto.setFilePath(filePath);
            ProfileImageEntity profileImageEntity = ProfileImageMapper.INSTANCE.profileImageDtoToEntity(profileImageDto);

            //Account Entity 프로필 이미지 셋
            accountEntity.setProfileImage(profileImageDto.getFilePath());


            //기존 사진 삭제
            Path existingFilePath = Paths.get(existingProfileImage.getFilePath());
            Files.delete(existingFilePath);

            profileImageRepository.save(profileImageEntity);

            log.debug("Profile image updated successfully, id = {}", accountId);


        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update profile image.");
        }
    }

}