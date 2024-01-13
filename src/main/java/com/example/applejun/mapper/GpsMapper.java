package com.example.applejun.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GpsMapper {
    GpsMapper INSTANCE = Mappers.getMapper(GpsMapper.class);
}
