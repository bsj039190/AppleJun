package com.example.applejun.service.serviceImpl;

import com.example.applejun.dto.GpsDto;
import com.example.applejun.entity.GpsEntity;
import com.example.applejun.mapper.GpsMapper;
import com.example.applejun.repository.GpsRepository;
import com.example.applejun.service.GpsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class GpsServiceImpl implements GpsService {
    private final GpsRepository gpsRepository;

    @Override
    public List<GpsDto> getGpsList(Pageable pageable) {
        Page<GpsEntity> gpsEntityPage = gpsRepository.findAll(pageable);

        List<GpsDto> gpsDtoList = new ArrayList<>();

        for (GpsEntity gpsEntity : gpsEntityPage) {
            GpsDto gpsDto = GpsMapper.INSTANCE.gpsEntityToDto(gpsEntity);
            gpsDtoList.add(gpsDto);
        }

        return gpsDtoList;
    }

    @Override
    public List<GpsDto> getGpsListBySubject(String subject, Pageable pageable) {
        Page<GpsEntity> gpsEntityPage = gpsRepository.findByNameContains(subject, pageable);

        List<GpsDto> gpsDtoList = new ArrayList<>();

        for (GpsEntity gpsEntity : gpsEntityPage) {
            GpsDto gpsDto = GpsMapper.INSTANCE.gpsEntityToDto(gpsEntity);
            gpsDtoList.add(gpsDto);
        }

        return gpsDtoList;
    }


    @Override
    public GpsDto getGps(Long id) {
        Optional<GpsEntity> gps = gpsRepository.findById(id);
        GpsEntity gpsEntity = gps.orElseThrow(() -> new RuntimeException("Gps is not found."));

        GpsDto gpsDto = GpsMapper.INSTANCE.gpsEntityToDto(gpsEntity);

        return gpsDto;
    }

    @Override
    public Long getGpsSizeBySubject(String subject) {
        Long gpsSize = gpsRepository.countBySubject(subject);
        return gpsSize;
    }

    @Override
    public Long getGpsSize() {
        Long gpsSize = gpsRepository.count();
        return gpsSize;
    }

    @Override
    public void createGps(GpsDto gpsDto) {
        GpsEntity gpsEntity = GpsMapper.INSTANCE.gpsDtoToEntity(gpsDto);

        if (gpsRepository.save(gpsEntity) == null) {
            throw new RuntimeException("gps save failed.");
        }
    }

    @Override
    public void updateGps(Long id, GpsDto gpsDto) {
        if (!gpsRepository.findById(id).isPresent()) {
            throw new RuntimeException("gps not found.");
        }

        gpsDto.setId(id);
        GpsEntity gpsEntity = GpsMapper.INSTANCE.gpsDtoToEntity(gpsDto);

        gpsRepository.save(gpsEntity);
    }

    @Override
    public void deleteGps(Long id) {
        if (!gpsRepository.findById(id).isPresent()) {
            throw new RuntimeException("gps not found.");
        }

        gpsRepository.deleteById(id);
    }

}
