package com.example.applejun.service;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.example.applejun.dto.AccountDto;
import com.example.applejun.entity.AccountEntity;
import com.example.applejun.mapper.AccountMapper;
import com.example.applejun.repository.AccountRepository;
import com.example.applejun.service.serviceImpl.AccountServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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
public class AccountServiceTest {
    @Mock
    private AccountRepository accountRepository;
    @InjectMocks
    private AccountServiceImpl accountService;

    private AccountEntity initEntity(Long id) {
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        AccountEntity accountEntity = AccountEntity.builder()
                .id(id)
                .name("name")
                .email("bsj039190@gmail.com")
                .account("account")
                .pwd("pwd")
                .connection("connection")
                .birthday(localDate)
                .build();
        return accountEntity;
    }

    private AccountDto initDto(Long id) {
        LocalDate localDate = LocalDate.of(2023, 1, 1);
        AccountDto accountDto = AccountDto.builder()
                .id(id)
                .name("name")
                .email("bsj039190@gmail.com")
                .account("account")
                .pwd("pwd")
                .connection("connection")
                .birthday(localDate)
                .build();
        return accountDto;
    }

    @Test
    public void getAccountListTest() throws Exception {
        Pageable pageable = PageRequest.of(0, 1);

        AccountEntity accountEntity = initEntity(1L);
        AccountEntity accountEntity1 = initEntity(2L);
        List<AccountEntity> accountEntityList = new ArrayList<>();
        accountEntityList.add(accountEntity);
        accountEntityList.add(accountEntity1);
        Page<AccountEntity> accountEntityPage = new PageImpl<>(accountEntityList);

        List<AccountDto> accountDtoList = new ArrayList<>();

        for (AccountEntity accountE : accountEntityList) {
            AccountDto accountDto = AccountMapper.INSTANCE.accountEntityToDto(accountE);
            accountDtoList.add(accountDto);
        }

        when(accountRepository.findAll(pageable)).thenReturn(accountEntityPage);

        List<AccountDto> expect = accountService.getAccountList(pageable);

        assertThat(expect, samePropertyValuesAs(accountDtoList));

    }

    @Test
    public void getAccountTest() throws Exception {
        AccountEntity accountEntity = initEntity(1L);
        Optional<AccountEntity> account = Optional.of(accountEntity);

        AccountDto accountDto = AccountMapper.INSTANCE.accountEntityToDto(accountEntity);

        when(accountRepository.findById(any())).thenReturn(account);

        AccountDto expect = accountService.getAccount(1L);

        assertThat(expect, samePropertyValuesAs(accountDto));
    }

//    @Test
//    public void createAccountTest() throws Exception {
//        AccountEntity accountEntity = initEntity(1L);
//        AccountDto accountDto = initDto(1L);
//
//        when(accountRepository.save(any())).thenReturn(accountEntity);
//
//        assertDoesNotThrow(() -> accountService.createAccount(accountDto));
//    }

//    @Test
//    public void updateAccountTest() throws Exception {
//        Long id = 1L;
//        AccountDto accountDto = initDto(1L);
//        AccountEntity accountEntity = initEntity(1L);
//
//        when(accountRepository.save(any())).thenReturn(accountEntity);
//        Optional<AccountEntity> account = Optional.of(accountEntity);
//        when(accountRepository.findById(any())).thenReturn(account);
//
//        assertDoesNotThrow(() -> accountService.updateAccount(id, accountDto));
//    }

    @Test
    public void deleteAccountTest() throws Exception {
        Long id = 1L;

        AccountEntity accountEntity = initEntity(1L);

        doNothing().when(accountRepository).deleteById(any());
        Optional<AccountEntity> account = Optional.of(accountEntity);
        when(accountRepository.findById(any())).thenReturn(account);

        assertDoesNotThrow(() -> accountService.deleteAccount(id));
    }
}
