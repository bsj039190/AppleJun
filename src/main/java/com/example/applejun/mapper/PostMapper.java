package com.example.applejun.mapper;

import com.example.applejun.dto.PostDto;
import com.example.applejun.entity.PostEntity;
import com.example.applejun.request.PostRequest;
import com.example.applejun.response.PostResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostMapper {
    PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

    PostResponse postDtoToResponse(PostDto postDto);

    @Mapping(source = "uploader.id", target = "uploader")
    //@Mapping(target = "gps", ignore = true)
    @Mapping(source = "gps1.id", target = "gps1")
    @Mapping(source = "gps2.id", target = "gps2")
    @Mapping(source = "gps3.id", target = "gps3")
    PostDto postEntityToDto(PostEntity postEntity);

    @Mapping(target = "id", ignore = true)
    PostDto postRequestToDto(PostRequest postRequest);

    @Mapping(source = "uploader", target = "uploader.id")
    //@Mapping(target = "gps", ignore = true)
    @Mapping(source = "gps1", target = "gps1.id")
    @Mapping(source = "gps2", target = "gps2.id")
    @Mapping(source = "gps3", target = "gps3.id")
    PostEntity postDtoToEntity(PostDto postDto);
}
