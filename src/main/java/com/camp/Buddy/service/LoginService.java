package com.camp.Buddy.service;

import com.camp.Buddy.model.response.LoginResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.concurrent.ExecutionException;


@Service
public class LoginService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String url;
    private final UserService userService;

    @Autowired
    public LoginService(RestTemplate restTemplate, ObjectMapper objectMapper, @Value("${url}") String url, UserService userService) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.url = url;
        this.userService = userService;
    }

    public ResponseEntity<LoginResponse> login(String login, String password) throws IOException, ExecutionException, InterruptedException {

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "password");
            body.add("username", login);
            body.add("password", password);
            body.add("client_id", "s21-open-api");

            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            String accessToken = jsonNode.get("access_token").asText();

            int result = userService.addUser(login, accessToken);
            LoginResponse loginResponse = new LoginResponse(accessToken, result);
            return ResponseEntity.ok(loginResponse);
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }
}