package com.example.applejun.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.BindingResult;

@Getter
@NoArgsConstructor
public class BindingErrorResponse extends BaseResponse {
    public BindingErrorResponse(BindingResult bindingResult) {
        super(400, bindingResult.getAllErrors().get(0).getDefaultMessage());
    }
}