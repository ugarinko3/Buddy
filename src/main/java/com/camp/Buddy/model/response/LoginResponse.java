package com.camp.Buddy.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String accessToken;
    private int result;

    public LoginResponse(String accessToken, int result) {
        this.accessToken = accessToken;
        this.result = result;
    }
}
