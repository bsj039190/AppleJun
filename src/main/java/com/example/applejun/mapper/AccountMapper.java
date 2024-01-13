package com.example.applejun.mapper;

import com.example.applejun.dto.AccountDto;
import com.example.applejun.entity.AccountEntity;
import com.example.applejun.request.AccountRequest;
import com.example.applejun.response.AccountResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AccountMapper {
    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);

    AccountResponse accountDtoToResponse(AccountDto accountDto);

    AccountDto accountEntityToDto(AccountEntity accountEntity);

    AccountDto accountRequestToDto(AccountRequest accountRequest);

    AccountEntity accountDtoToEntity(AccountDto accountDto);
}
