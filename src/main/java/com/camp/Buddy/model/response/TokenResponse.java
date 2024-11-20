package com.camp.Buddy.model.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenResponse {
    private String role;
    private String login;
    private boolean create;
}
