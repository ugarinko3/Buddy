package com.camp.Buddy.controller;


import com.camp.Buddy.model.response.TokenResponse;
import com.camp.Buddy.service.TokenService;
import com.camp.Buddy.model.request.TokenRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
