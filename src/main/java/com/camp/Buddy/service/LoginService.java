package com.camp.Buddy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import com.camp.Buddy.service.AppUserBase;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import static com.camp.Buddy.service.AppUserBase.addUser;

@Service
public class LoginService {

  @Value("${url}")
  private String url_;

  @Autowired
  private RestTemplate restTemplate;

  private final ObjectMapper objectMapper;

  @Autowired
  public LoginService(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public ResponseEntity<String> login(String login, String password) throws IOException, ExecutionException, InterruptedException {
    String url = url_;

    // Создаем заголовки
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    // Создаем тело запроса в формате x-www-form-urlencoded
    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("grant_type", "password");
    body.add("username", login);
    body.add("password", password);
    body.add("client_id", "s21-open-api");

    // Создаем HttpEntity с заголовками и телом
    HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

    // Отправляем POST-запрос
    ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

    JsonNode jsonNode = objectMapper.readTree(response.getBody());
    String accessToken = jsonNode.get("access_token").asText();

    if(accessToken != null) { AppUserBase.addUser(login); }

    return ResponseEntity.ok("{\"access_token\":\"" + accessToken + "\"}");
  }
}
