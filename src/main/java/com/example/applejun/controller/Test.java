package com.example.applejun.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    @GetMapping("/ttt")
    public String test() {
        return "he is alive!";
    }
}
