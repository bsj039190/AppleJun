package com.example.applejun.mapper;

import com.example.applejun.dto.ProfileImageDto;
import com.example.applejun.entity.ProfileImageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProfileImageMapper {
    ProfileImageMapper INSTANCE = Mappers.getMapper(ProfileImageMapper.class);

    @Mapping(source = "account", target = "account.id")
    ProfileImageEntity profileImageDtoToEntity(ProfileImageDto profileImageDto);
}
