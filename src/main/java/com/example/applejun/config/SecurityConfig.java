package com.example.applejun.config;

import com.example.applejun.config.handler.LoginSuccessHandler;
import com.example.applejun.service.serviceImpl.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private LoginSuccessHandler loginSuccessHandler;
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/home", "/login", "gps/**", "map/**", "/account/create", "/profile/upload").permitAll()
                .antMatchers("/background/**", "/post/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginProcessingUrl("/login") // 로그인 요청 URL 설정
                .usernameParameter("account") // 사용자명 파라미터명 설정
                .passwordParameter("password") // 비밀번호 파라미터명 설정
                .successHandler((request, response, authentication) -> {
                    // 로그인 성공 시 동작
                    response.setStatus(HttpServletResponse.SC_OK);
                    // 여기에 클라이언트에게 전달할 데이터를 설정할 수 있습니다.
                })
                .failureHandler((request, response, exception) -> {
                    // 로그인 실패 시 동작
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    // 실패 메시지를 클라이언트에게 전달할 수 있습니다.
                })
                .permitAll()
                .and()
                .logout()
                .logoutUrl("/logout") // 로그아웃 요청 URL 설정
                .logoutSuccessHandler((request, response, authentication) -> {
                    // 로그아웃 성공 시 동작
                    response.setStatus(HttpServletResponse.SC_OK);
                })
                .permitAll()
                .and()
                .rememberMe()
                .key("SecretKey")
                .rememberMeParameter("remember")
                .tokenValiditySeconds(3600)
                .userDetailsService(customUserDetailService);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
