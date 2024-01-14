package com.example.applejun.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ContentsResponse<T> extends BaseResponse {
    private final T contents;

    @JsonCreator
    public ContentsResponse(@JsonProperty("code") Integer code,
                            @JsonProperty("msg") String msg,
                            @JsonProperty("contents") T data) {
        super(code, msg);
        this.contents = data;
    }
}
