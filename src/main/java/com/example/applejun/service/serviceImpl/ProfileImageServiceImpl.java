package com.example.applejun.service.serviceImpl;

import com.example.applejun.dto.ProfileImageDto;
import com.example.applejun.entity.ProfileImageEntity;
import com.example.applejun.mapper.ProfileImageMapper;
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
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ProfileImageServiceImpl implements ProfileImageService {
    private final ProfileImageRepository profileImageRepository;

    private final String UPLOAD_DIR = "src/main/resources/static/files/uploads/profile-images/";


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
    public void uploadProfile(MultipartFile file, String uuid) {

        //근데 생각해보니까 프사업로드를 할거면 어카운트랑 연계가 되야하는데 이거는 그냥 업로드만 하고있는데 이러면 어떻게 지정하지...?
        //컨트롤러에서 리퀘스트 받는거는 또 안되던데

        log.debug("Ummmmmmmmm");

        try {
            // 업로드할 디렉토리 생성
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

            log.debug("is alive");

            // 여기에서 필요한 추가 로직을 수행할 수 있습니다. (예: 데이터베이스에 파일 경로 저장 등)
        } catch (IOException e) {
            // 파일 저장 중 에러 발생 시 예외 처리
            e.printStackTrace();
            throw new RuntimeException("Failed to upload profile image.");
        }
    }

    /*@Override
    public byte[] getProfileImage(String fileName) {
        try {

        }
    }*/

}