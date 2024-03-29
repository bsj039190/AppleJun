package com.example.applejun.mapper;

import com.example.applejun.dto.GpsDto;
import com.example.applejun.entity.GpsEntity;
import com.example.applejun.request.GpsRequest;
import com.example.applejun.response.GpsResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GpsMapper {
    GpsMapper INSTANCE = Mappers.getMapper(GpsMapper.class);

    GpsResponse gpsDtoToResponse(GpsDto gpsDto);

    GpsDto gpsEntityToDto(GpsEntity gpsEntity);

    @Mapping(target = "id", ignore = true)
    GpsDto gpsRequestToDto(GpsRequest gpsRequest);

    GpsEntity gpsDtoToEntity(GpsDto gpsDto);
}
