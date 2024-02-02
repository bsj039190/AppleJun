package com.example.applejun.controller;

import com.example.applejun.dto.AccountDto;
import com.example.applejun.mapper.AccountMapper;
import com.example.applejun.request.AccountRequest;
import com.example.applejun.response.AccountResponse;
import com.example.applejun.response.BaseResponse;
import com.example.applejun.response.BindingErrorResponse;
import com.example.applejun.response.ContentsResponse;
import com.example.applejun.service.AccountService;
import com.example.applejun.service.serviceImpl.AccountServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@Slf4j
public class AccountController {

    private final AccountService accountService;

    
    //포스트맨 테스트 완료
    
    @GetMapping("/aaa")
    public String test() {
        log.warn("Um jun sik");
        return "엄준식은 살아있다";
    }

    @GetMapping("/account/get/list")
    public ResponseEntity<BaseResponse> getAccountList(@PageableDefault (sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        log.debug("start get account list.");

        List<AccountDto> accountDtoList = accountService.getAccountList(pageable);

        List<AccountResponse> accountResponseList = new ArrayList<>();

        for (AccountDto accountDto : accountDtoList) {
            AccountResponse accountResponse = AccountMapper.INSTANCE.accountDtoToResponse(accountDto);
            accountResponseList.add(accountResponse);
        }
        ContentsResponse<List<AccountResponse>> response = new ContentsResponse<>(HttpStatus.OK.value(), "success",
                accountResponseList);

        log.debug("end get account list. account = {}", accountResponseList);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/account/get/{id}")
    public ResponseEntity<BaseResponse> getAccount(@PathVariable("id") @NotBlank String id) {
        log.debug("start get account. id = {}", id);

        AccountDto accountDto = accountService.getAccount(Long.parseLong(id));

        AccountResponse accountResponse = AccountMapper.INSTANCE.accountDtoToResponse(accountDto);

        ContentsResponse<AccountResponse> response = new ContentsResponse<>(HttpStatus.OK.value(), "success",
                accountResponse);

        log.debug("end get account. account = {}", accountResponse);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/account/create")
    public ResponseEntity<BaseResponse> createAccount(@RequestBody @Validated AccountRequest accountRequest,
                                                      BindingResult bindingResult) {
        log.debug("start create account. request = {}", accountRequest);

        if (bindingResult.hasErrors()) {
            log.error("bind error. error = {}", bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BindingErrorResponse(bindingResult));
        }

        AccountDto accountDto = AccountMapper.INSTANCE.accountRequestToDto(accountRequest);

        accountService.createAccount(accountDto);

        log.debug("end create account. id = {}", accountDto.getId());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), "success"));
    }

    @PutMapping("/account/update/{id}")
    public ResponseEntity<BaseResponse> updateAccount(@PathVariable("id") @NotBlank String id,
                                                      @RequestBody @Validated AccountRequest accountRequest,
                                                      BindingResult bindingResult) {
        log.debug("start update account. id = {}, request = {}", id, accountRequest);

        if (bindingResult.hasErrors()) {
            log.error("bind error. error = {}", bindingResult);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BindingErrorResponse(bindingResult));
        }

        AccountDto accountDto = AccountMapper.INSTANCE.accountRequestToDto(accountRequest);

        accountService.updateAccount(Long.parseLong(id), accountDto);

        log.debug("end update account");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), "success"));
    }

    @DeleteMapping("/account/delete/{id}")
    public ResponseEntity<BaseResponse> deleteAccount(@PathVariable("id") @NotBlank String id) {
        log.debug("start delete account. id = {}", id);

        accountService.deleteAccount(Long.parseLong(id));

        log.debug("end delete account.");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), "success"));
    }
}

