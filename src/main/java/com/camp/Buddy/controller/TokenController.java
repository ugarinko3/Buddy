package com.camp.Buddy.controller;


import com.camp.Buddy.model.TokenResponse;
import com.camp.Buddy.service.TokenService;
import com.camp.Buddy.model.TokenRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/token")
public class TokenController {

    private final TokenService tokenService;

    @PostMapping
    public ResponseEntity<TokenResponse> statusToken(@RequestBody TokenRequest tokenRequest) {
        TokenResponse tokenResponses = tokenService.statusToken(tokenRequest.getToken(), tokenRequest.getLogin());
        return ResponseEntity.ok(tokenResponses);
    }
}
