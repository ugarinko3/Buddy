package com.camp.Buddy.model.request;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenRequest {
    private String token;
    private String login;
}
