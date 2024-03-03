package com.example.applejun.service.serviceImpl;

import com.example.applejun.entity.AccountEntity;
import com.example.applejun.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 데이터베이스에서 사용자 정보를 가져오는 코드를 작성
        AccountEntity account = accountRepository.findByAccount(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // 아이디가 1인 경우 ADMIN 권한 추가
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        if (account.getId() == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }

        // RememberMe 설정 추가
        boolean accountNonExpired = true;
        boolean accountNonLocked = true;
        boolean credentialsNonExpired = true;
        boolean enabled = true;

        return new User(
                account.getAccount(),
                account.getPwd(),
                enabled,
                accountNonExpired,
                credentialsNonExpired,
                accountNonLocked,
                authorities
        );
    }
}
//{"account":"test3","password":"3919"}]
//account=test3&password=3919]


