package com.example.applejun.service.serviceImpl;

import com.example.applejun.dto.PostImageDto;
import com.example.applejun.entity.PostImageEntity;
import com.example.applejun.mapper.PostImageMapper;
import com.example.applejun.mapper.PostMapper;
import com.example.applejun.repository.PostImageRepository;
import com.example.applejun.service.PostImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PostImageServiceImpl implements PostImageService {

    public final PostImageRepository postImageRepository;

    public final String UPLOAD_DIR = "src/main/resources/static/files/uploads/post-images/";

    @Override
    public void uploadPostImage(List<MultipartFile> fileList, Long postId) {
        try {
            //업로드 할 디렉토리 생성

            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            for (MultipartFile file : fileList) {
                String uuid = UUID.randomUUID().toString();

                //저장경로 설정
                String filePath = UPLOAD_DIR + uuid + "_" + file.getOriginalFilename();
                File dest = new File(filePath);

                //파일 복사
                FileCopyUtils.copy(file.getBytes(), dest);

                //엔티티 생성 및 검색을 위해서 패스 수정
                PostImageDto postImageDto = PostImageDto.builder()
                        .id(null)
                        .fileName(file.getOriginalFilename())
                        .filePath(filePath)
                        .postId(postId)
                        .build();

                PostImageEntity postImageEntity = PostImageMapper.INSTANCE.postImageDtoToEntity(postImageDto);

                if (postImageRepository.save(postImageEntity) == null) {
                    throw new RuntimeException("post image save failed.");
                }

                log.debug("success save post image, id = {}", postImageEntity.getId());
            }

        } catch (IOException e) {
            // 파일 저장 중 에러 발생 시 예외 처리
            e.printStackTrace();
            throw new RuntimeException("Failed to upload profile image.");
        }
    }
}
