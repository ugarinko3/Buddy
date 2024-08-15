package com.camp.Buddy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import com.camp.Buddy.model.TokenResponse;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class LoginService {

  @Value("${url}")
  private String url_;

  public ResponseEntity<String> login(String login, String password) throws IOException {
    URL url = new URL(url_);

    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("POST");
    connection.setDoOutput(true);
    String body = "grant_type=password&username=" + login + "&password=" + password + "&client_id=s21-open-api";
    OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
    writer.write(body);
    writer.flush();

    // Считываем ответ от сервера
    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
    String line;
    StringBuilder response = new StringBuilder();
    while ((line = reader.readLine()) != null) {
      response.append(line);
    }
    reader.close();

    // Выводим ответ от сервера
    String jsonResponse = response.toString();

    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode jsonNode = objectMapper.readTree(jsonResponse);
    String accessToken = jsonNode.get("access_token").asText();

    return ResponseEntity.ok("{\"access_token\":\"" + accessToken + "\"}");
  }
}
