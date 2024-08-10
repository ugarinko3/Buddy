package com.camp.Buddy.controller;

import com.camp.Buddy.model.TokenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {

  private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

  @Autowired
  private RestTemplate restTemplate;



  @CrossOrigin(origins = "http://localhost:3000")
  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> login(@RequestParam String login, @RequestParam String password)  {

  String url = "https://auth.sberclass.ru/auth/realms/EduPowerKeycloak/protocol/openid-connect/token";
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    String body = "grant_type=password&username=" + login + "&password=" + password + "&client_id=s21-open-api";
    HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);

    try {
      TokenResponse response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, TokenResponse.class).getBody();

      if (response == null || response.getAccessToken() == null) {
        logger.error("Ошибка при получении токена: ответ от сервера не содержит данных");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // Возвращаем 401
      }

      Map<String, String> tokenResponse = new HashMap<>();
      tokenResponse.put("access_token", response.getAccessToken());
      return ResponseEntity.ok(tokenResponse);
    } catch (Exception e) {
      logger.error("Ошибка при выполнении запроса: ", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Возвращаем 500 в случае ошибки
    }
  }
}
