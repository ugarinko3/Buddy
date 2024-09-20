package com.camp.Buddy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.concurrent.ExecutionException;


//@AllArgsConstructor
@Service
public class LoginService {

  private final RestTemplate restTemplate;
  private final ObjectMapper objectMapper;
  private final AppUserBase appUserBase;
  private final String url; // Уберите @Value здесь

  @Autowired
  public LoginService(RestTemplate restTemplate, ObjectMapper objectMapper, AppUserBase appUserBase, @Value("${url}") String url) {
    this.restTemplate = restTemplate;
    this.objectMapper = objectMapper;
    this.appUserBase = appUserBase;
    this.url = url; // Инициализируйте url здесь
  }

  public ResponseEntity<String> login(String login, String password) throws IOException, ExecutionException, InterruptedException {

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

    appUserBase.addUser(login);
    return ResponseEntity.ok("{\"access_token\":\"" + accessToken + "\"}");
  }
}