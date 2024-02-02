package com.example.applejun.mapper;

import com.example.applejun.dto.ProfileImageDto;
import com.example.applejun.entity.ProfileImageEntity;
import com.example.applejun.request.ProfileImageRequest;
import com.example.applejun.response.ProfileImageResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProfileImageMapper {
    ProfileImageMapper INSTANCE = Mappers.getMapper(ProfileImageMapper.class);

    ProfileImageResponse profileImageDtoToResponse(ProfileImageDto profileImageDto);

    @Mapping(source = "account.id", target = "account")
    ProfileImageDto profileImageEntityToDto(ProfileImageEntity profileImageEntity);

    @Mapping(target = "id", ignore = true)
    ProfileImageDto profileImageRequestToDto(ProfileImageRequest profileImageRequest);

    @Mapping(source = "account", target = "account.id")
    ProfileImageEntity profileImageDtoToEntity(ProfileImageDto profileImageDto);
}
