package com.example.applejun.controller;

import com.example.applejun.dto.AccountDto;
import com.example.applejun.request.AccountRequest;
import com.example.applejun.service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class AccountControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    AccountService accountService;

    @Test
    public void getAccountListTest() throws Exception {
        List<AccountDto> accountDtoList = new ArrayList<>();
        AccountDto accountDto = new AccountDto();
        accountDto.setId(1L);
        AccountDto accountDto1 = new AccountDto();
        accountDto1.setId(2L);
        accountDtoList.add(accountDto);
        accountDtoList.add(accountDto1);

        when(accountService.getAccountList(any())).thenReturn(accountDtoList);

        mockMvc.perform(MockMvcRequestBuilders.get("/account/get/list"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[0].id").value(1L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contents[1].id").value(2L));
    }

    @Test
    public void getAccountTest() throws Exception{
        String id = "1";
        AccountDto accountDto = new AccountDto();
        accountDto.setId(1L);

        when(accountService.getAccount(any())).thenReturn(accountDto);

        mockMvc.perform(MockMvcRequestBuilders.get("/account/get/{id}", id))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contents.id").value(1L));
    }

    @Test
    public void createAccountTest() throws Exception {
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        AccountRequest accountRequest = new AccountRequest("name", "bsj039190@gmail.com", "account", "pwd", "connection", localDate, null);
        AccountDto accountDto = new AccountDto();
        accountDto.setId(1L);

        String requestString = objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(accountRequest);

        doNothing().when(accountService).createAccount(any());

        mockMvc.perform(MockMvcRequestBuilders.post("/account/create")
                .content(requestString)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(201))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"));
    }

    @Test
    public void updateAccountTest() throws Exception {
        String id = "1";
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        AccountRequest accountRequest = new AccountRequest("name", "bsj039190@gmail.com", "account", "pwd", "connection", localDate, null);

        String requestString = objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(accountRequest);

        doNothing().when(accountService).updateAccount(any(), any());

        mockMvc.perform(MockMvcRequestBuilders.put("/account/update/{id}", id)
                .content(requestString)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"));
    }

    @Test
    public void deleteAccountTest() throws Exception {
        String id = "1";

        doNothing().when(accountService).deleteAccount(any());

        mockMvc.perform(MockMvcRequestBuilders.delete("/account/delete/{id}", id))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.msg").value("success"));
    }

}
