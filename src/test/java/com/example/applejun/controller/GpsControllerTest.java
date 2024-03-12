//package com.example.applejun.controller;
//
//import com.example.applejun.dto.GpsDto;
//import com.example.applejun.request.GpsRequest;
//import com.example.applejun.service.GpsService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc(addFilters = false)
//public class GpsControllerTest {
//    @Autowired
//    MockMvc mockMvc;
//
//    @Autowired
//    ObjectMapper objectMapper;
//
//    @MockBean
//    GpsService gpsService;
//
//    @Test
//    public void getGpsListTest() throws Exception {
//        List<GpsDto> gpsDtoList = new ArrayList<>();
//        GpsDto gpsDto = new GpsDto();
//        gpsDto.setId(1L);
//        GpsDto gpsDto1 = new GpsDto();
//        gpsDto1.setId(2L);
//        gpsDtoList.add(gpsDto);
//        gpsDtoList.add(gpsDto1);
//
//        when(gpsService.getGpsList(any())).thenReturn(gpsDtoList);
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/gps/get/list"))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[0].id").value(1L))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[1].id").value(2L));
//    }
//
//    @Test
//    public void getGpsListBySubjectTest() throws Exception {
//        String subject = "aa";
//        List<GpsDto> gpsDtoList = new ArrayList<>();
//        GpsDto gpsDto = new GpsDto();
//        gpsDto.setId(1L);
//        GpsDto gpsDto1 = new GpsDto();
//        gpsDto1.setId(2L);
//        gpsDtoList.add(gpsDto);
//        gpsDtoList.add(gpsDto1);
//
//        when(gpsService.getGpsListBySubject(any(), any())).thenReturn(gpsDtoList);
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/gps/get/list/{subject}", subject)
//                        .param("subject", subject))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[0].id").value(1L))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[1].id").value(2L));
//    }
//
//    @Test
//    public void getGpsSizeTest() throws Exception {
//        Long size = 5L;
//
//        when(gpsService.getGpsSize()).thenReturn(size);
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/gps/size"))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.contents").value(5L));
//    }
//
//    @Test
//    public void getGpsSizeBySubjectTest() throws Exception {
//        Long size = 5L;
//        String subject = "aa";
//
//        when(gpsService.getGpsSizeBySubject(any())).thenReturn(size);
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/gps/size/{subject}", subject)
//                        .param("subject", subject))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.contents").value(5L));
//    }
//
//    @Test
//    public void getGpsTest() throws Exception {
//        String id = "1";
//        GpsDto gpsDto = new GpsDto();
//        gpsDto.setId(1L);
//
//        when(gpsService.getGps(any())).thenReturn(gpsDto);
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/gps/{id}", id))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.contents.id").value(1L));
//    }
//
//    @Test
//    public void createGpsTest() throws Exception {
//        LocalDate localDate = LocalDate.of(2023, 1, 1);
//        GpsRequest gpsRequest = new GpsRequest("name", 10L, 10L, "url", "subject", localDate);
//        GpsDto gpsDto = new GpsDto();
//        gpsDto.setId(1L);
//
//        String requestString = objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(gpsRequest);
//
//        doNothing().when(gpsService).createGps(any());
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/gps/create")
//                        .content(requestString)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isCreated())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(201))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"));
//    }
//
//    @Test
//    public void updateGpsTest() throws Exception {
//        String id = "1";
//        LocalDate localDate = LocalDate.of(2023, 1, 1);
//        GpsRequest gpsRequest = new GpsRequest("name", 10L, 10L, "url", "subject", localDate);
//
//        String requestString = objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(gpsRequest);
//
//        doNothing().when(gpsService).updateGps(any(), any());
//
//        mockMvc.perform(MockMvcRequestBuilders.put("/gps/update/{id}", id)
//                .content(requestString)
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"));
//    }
//
//    @Test
//    public void deleteGpsTest() throws Exception {
//        String id = "1";
//
//        doNothing().when(gpsService).deleteGps(any());
//
//        mockMvc.perform(MockMvcRequestBuilders.delete("/gps/delete/{id}", id))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"));
//    }
//}
