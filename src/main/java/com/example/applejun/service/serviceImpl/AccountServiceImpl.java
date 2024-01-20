package com.example.applejun.service.serviceImpl;

import com.example.applejun.dto.AccountDto;
import com.example.applejun.entity.AccountEntity;
import com.example.applejun.mapper.AccountMapper;
import com.example.applejun.repository.AccountRepository;
import com.example.applejun.service.AccountService;
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
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;


    @Override
    public List<AccountDto> getAccountList(Pageable pageable) {
        Page<AccountEntity> accountEntityPage = accountRepository.findAll(pageable);

        List<AccountDto> accountDtoList = new ArrayList<>();

        for (AccountEntity accountEntity : accountEntityPage) {
            AccountDto accountDto = AccountMapper.INSTANCE.accountEntityToDto(accountEntity);
            accountDtoList.add(accountDto);
        }

        return accountDtoList;
    }

    @Override
    public AccountDto getAccount(Long id) {
        Optional<AccountEntity> account = accountRepository.findById(id);
        AccountEntity accountEntity = account.orElseThrow(() -> new RuntimeException("Account not found."));

        AccountDto accountDto = AccountMapper.INSTANCE.accountEntityToDto(accountEntity);

        return accountDto;
    }

    @Override
    public void createAccount(AccountDto accountDto) {
        AccountEntity accountEntity = AccountMapper.INSTANCE.accountDtoToEntity(accountDto);

        if (accountRepository.save(accountEntity) == null) {
            throw new RuntimeException("account save failed.");
        }
    }

    @Override
    public void updateAccount(Long id, AccountDto accountDto) {
        if (!accountRepository.findById(id).isPresent()) {
            throw new RuntimeException("account not found.");
        }

        accountDto.setId(id);
        AccountEntity accountEntity = AccountMapper.INSTANCE.accountDtoToEntity(accountDto);

        accountRepository.save(accountEntity);
    }

    @Override
    public void deleteAccount(Long id) {
        if (!accountRepository.findById(id).isPresent()) {
            throw new RuntimeException("account not found.");
        }

        accountRepository.deleteById(id);
    }
}
