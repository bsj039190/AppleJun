package com.example.applejun.service;

import com.example.applejun.dto.GpsDto;
import com.example.applejun.entity.GpsEntity;
import com.example.applejun.mapper.GpsMapper;
import com.example.applejun.repository.GpsRepository;
import com.example.applejun.service.serviceImpl.GpsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.samePropertyValuesAs;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class GpsServiceTest {
    @Mock
    private GpsRepository gpsRepository;

    @InjectMocks
    private GpsServiceImpl gpsService;

    private GpsEntity initEntity(Long id) {
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        GpsEntity gpsEntity = GpsEntity.builder()
                .id(id)
                .name("name")
                .gpsLng(5L)
                .gpsLat(5L)
                .url("url")
                .subject("subject")
                .date(localDate)
                .build();
        return gpsEntity;
    }

    private GpsDto initDto(Long id) {
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        GpsDto gpsDto = GpsDto.builder()
                .id(id)
                .name("name")
                .gpsLng(5L)
                .gpsLat(5L)
                .url("url")
                .subject("subject")
                .date(localDate)
                .build();
        return gpsDto;
    }

    @Test
    public void getGpsListTest() throws Exception {
        Pageable pageable = PageRequest.of(0, 1);

        List<GpsEntity> gpsEntityList = new ArrayList<>();
        GpsEntity gpsEntity = initEntity(1L);
        GpsEntity gpsEntity1 = initEntity(2L);
        gpsEntityList.add(gpsEntity);
        gpsEntityList.add(gpsEntity1);
        Page<GpsEntity> gpsEntityPage = new PageImpl<>(gpsEntityList);

        List<GpsDto> gpsDtoList = new ArrayList<>();

        for (GpsEntity gpsE : gpsEntityList) {
            GpsDto gpsDto = GpsMapper.INSTANCE.gpsEntityToDto(gpsE);
            gpsDtoList.add(gpsDto);
        }

        when(gpsRepository.findAll(pageable)).thenReturn(gpsEntityPage);

        List<GpsDto> expect = gpsService.getGpsList(pageable);

        assertThat(expect, samePropertyValuesAs(gpsDtoList));
    }

    @Test
    public void getGpsListBySubjectTest() throws Exception {
        Pageable pageable = PageRequest.of(0, 1);

        List<GpsEntity> gpsEntityList = new ArrayList<>();
        GpsEntity gpsEntity = initEntity(1L);
        GpsEntity gpsEntity1 = initEntity(2L);
        gpsEntityList.add(gpsEntity);
        gpsEntityList.add(gpsEntity1);
        Page<GpsEntity> gpsEntityPage = new PageImpl<>(gpsEntityList);

        List<GpsDto> gpsDtoList = new ArrayList<>();

        for (GpsEntity gpsE : gpsEntityList) {
            GpsDto gpsDto = GpsMapper.INSTANCE.gpsEntityToDto(gpsE);
            gpsDtoList.add(gpsDto);
        }

        when(gpsRepository.findByNameContains(any(), any())).thenReturn(gpsEntityPage);

        List<GpsDto> expect = gpsService.getGpsListBySubject("subject", pageable);

        assertThat(expect, samePropertyValuesAs(gpsDtoList));
    }

    @Test
    public void getGpsTest() throws Exception {
        GpsEntity gpsEntity = initEntity(1L);
        Optional<GpsEntity> gps = Optional.of(gpsEntity);

        GpsDto gpsDto = GpsMapper.INSTANCE.gpsEntityToDto(gpsEntity);

        when(gpsRepository.findById(any())).thenReturn(gps);

        GpsDto expect = gpsService.getGps(1L);

        assertThat(expect, samePropertyValuesAs(gpsDto));
    }

    @Test
    public void getGpsSizeBySubjectTest() throws Exception {
        Long size = 5L;

        when(gpsRepository.countBySubject(any())).thenReturn(size);

        Long expect = gpsService.getGpsSizeBySubject("subject");

        assertThat(expect, samePropertyValuesAs(size));
    }

    @Test
    public void getGpsSizeTest() throws Exception {
        Long size = 5L;

        when(gpsRepository.count()).thenReturn(size);

        Long expect = gpsService.getGpsSize();

        assertThat(expect, samePropertyValuesAs(size));
    }

    @Test
    public void createGpsTest() throws Exception {
        GpsEntity gpsEntity = initEntity(1L);
        GpsDto gpsDto = initDto(1L);

        when(gpsRepository.save(any())).thenReturn(gpsEntity);

        assertDoesNotThrow(() -> gpsService.createGps(gpsDto));
    }

    @Test
    public void updateGpsTest() throws Exception {
        Long id = 1L;
        GpsDto gpsDto = initDto(1L);
        GpsEntity gpsEntity = initEntity(1L);

        when(gpsRepository.save(any())).thenReturn(gpsEntity);
        Optional<GpsEntity> gps = Optional.of(gpsEntity);
        when(gpsRepository.findById(any())).thenReturn(gps);

        assertDoesNotThrow(() -> gpsService.updateGps(id, gpsDto));
    }

    @Test
    public void deleteGpsTest() throws Exception {
        Long id = 1L;

        GpsEntity gpsEntity = initEntity(1L);

        doNothing().when(gpsRepository).deleteById(any());
        Optional<GpsEntity> gps = Optional.of(gpsEntity);
        when(gpsRepository.findById(any())).thenReturn(gps);

        assertDoesNotThrow(() -> gpsService.deleteGps(id));
    }

}
