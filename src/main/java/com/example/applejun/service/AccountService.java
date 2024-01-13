package com.example.applejun.service;

import com.example.applejun.dto.AccountDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AccountService {
    List<AccountDto> getAccountList(Pageable pageable);
    AccountDto getAccount(Long id);
    void createAccount(AccountDto accountDto);
    void updateAccount(Long id, AccountDto accountDto);
    void deleteAccount(Long id);
}
