package com.example.applejun.mapper;

import com.example.applejun.dto.PostImageDto;
import com.example.applejun.entity.PostImageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostImageMapper {
    PostImageMapper INSTANCE = Mappers.getMapper(PostImageMapper.class);

    @Mapping(source = "postId", target = "postId.id")
    PostImageEntity postImageDtoToEntity(PostImageDto postImageDto);
}
