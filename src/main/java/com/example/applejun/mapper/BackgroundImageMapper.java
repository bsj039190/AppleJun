package com.example.applejun.mapper;

import com.example.applejun.dto.BackgroundImageDto;
import com.example.applejun.entity.BackgroundImageEntity;
import com.example.applejun.request.BackgroundImageRequest;
import com.example.applejun.response.BackgroundImageResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BackgroundImageMapper {
    BackgroundImageMapper INSTANCE = Mappers.getMapper(BackgroundImageMapper.class);

    BackgroundImageResponse backgroundImageDtoToResponse(BackgroundImageDto backgroundImageDto);

    BackgroundImageDto backgroundImageEntityToDto(BackgroundImageEntity backgroundImageEntity);

    @Mapping(target = "id", ignore = true)
    BackgroundImageDto backgroundImageRequestToDto(BackgroundImageRequest backgroundImageRequest);

    BackgroundImageEntity backgroundImageDtoToEntity(BackgroundImageDto backgroundImageDto);
}
