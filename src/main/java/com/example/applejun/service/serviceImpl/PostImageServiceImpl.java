package com.example.applejun.service.serviceImpl;

import com.example.applejun.dto.PostImageDto;
import com.example.applejun.entity.PostEntity;
import com.example.applejun.entity.PostImageEntity;
import com.example.applejun.mapper.PostImageMapper;
import com.example.applejun.mapper.PostMapper;
import com.example.applejun.repository.PostImageRepository;
import com.example.applejun.repository.PostRepository;
import com.example.applejun.service.PostImageService;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PostImageServiceImpl implements PostImageService {

    private final PostImageRepository postImageRepository;

    private final PostRepository postRepository;

    public final String UPLOAD_DIR = "src/main/resources/static/files/uploads/post-images/";


    @Override
    public List<byte[]> getPostImageList(Long postId) {

        try {
            //postId로 엔티티 검색
            Optional<PostEntity> postEntityOptional = postRepository.findById(postId);
            PostEntity postEntity = postEntityOptional.orElse(null);
            List<PostImageEntity> postImageEntityList = postImageRepository.findByPostId(postEntity);

            List<byte[]> imageBytesList = new ArrayList<>();
            //각 엔티티의 filePath에 있는 이미지를 검색후 리스트에 저장
            for (PostImageEntity postImageEntity : postImageEntityList) {
                //파일 경로를 path 객체로 변환
                byte[] imageBytes = Files.readAllBytes(Paths.get(postImageEntity.getFilePath()));
                imageBytesList.add(imageBytes);
            }

            return imageBytesList;

        } catch (IOException e) {
            // 파일 저장 중 에러 발생 시 예외 처리
            e.printStackTrace();
            throw new RuntimeException("Failed to upload post image.");
        }


    }


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
            throw new RuntimeException("Failed to upload post image.");
        }
    }


    @Override
    public void updatePostImage(List<MultipartFile> fileList, Long postId) {
        try {

            // 업로드할 디렉토리 생성
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            //기존의 포스트에 있는 이미지 검색, 어카운트id로 검색
            Optional<PostEntity> postEntityOptional = postRepository.findById(postId);
            PostEntity postEntity = postEntityOptional.orElse(null);
            List<PostImageEntity> originalPostImageEntity = postImageRepository.findByPostId(postEntity);

            //기존의 이미지들 삭제, 엔티티도 삭제진행
            for (PostImageEntity postImageEntity : originalPostImageEntity) {
                Path existingFilePath = Paths.get(postImageEntity.getFilePath());
                Files.delete(existingFilePath);
                postImageRepository.delete(postImageEntity);
            }


            //새로운 이미지 업로드, 업데이트를 해도 사진엔티티의 아이디는 달라짐
            for (MultipartFile file : fileList)  {

                String uuid = UUID.randomUUID().toString();

                String filePath = UPLOAD_DIR + uuid + "_" + file.getOriginalFilename();
                File dest = new File(filePath);

                //새로운 이미지 저장
                FileCopyUtils.copy(file.getBytes(), dest);

                //새로운 엔티티 생성
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

                log.debug("success update and upload post image, id = {}", postImageEntity.getId());

            }


        } catch (IOException e) {
            // 파일 저장 중 에러 발생 시 예외 처리
            e.printStackTrace();
            throw new RuntimeException("Failed to update post image.");
        }
    }


    @Override
    public void deletePostImage(Long postId) {

        try {
            //기존의 포스트에 있는 이미지 검색, 어카운트id로 검색
            Optional<PostEntity> postEntityOptional = postRepository.findById(postId);
            PostEntity postEntity = postEntityOptional.orElse(null);
            List<PostImageEntity> originalPostImageEntity = postImageRepository.findByPostId(postEntity);

            //기존의 이미지들 삭제
            for (PostImageEntity postImageEntity : originalPostImageEntity) {
                Path existingFilePath = Paths.get(postImageEntity.getFilePath());
                Files.delete(existingFilePath);
                postImageRepository.delete(postImageEntity);

                log.debug("success delete post image, id = {}", postImageEntity.getId());
            }


        } catch (IOException e) {
            // 파일 저장 중 에러 발생 시 예외 처리
            e.printStackTrace();
            throw new RuntimeException("Failed to delete post image.");
        }
    }


}
