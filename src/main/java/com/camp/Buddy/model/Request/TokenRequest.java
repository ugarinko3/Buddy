package com.camp.Buddy.model.Request;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenRequest {
    private String token;
    private String login;
}
