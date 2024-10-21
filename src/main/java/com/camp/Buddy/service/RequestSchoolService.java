package com.camp.Buddy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@AllArgsConstructor
@Service
public class RequestSchoolService {

    private final String url_verification;
    private final RestTemplate restTemplate;

    @Autowired
    public RequestSchoolService( RestTemplate restTemplate, @Value("${url_verification}") String url_verification){
        this.restTemplate = restTemplate;
        this.url_verification = url_verification;
    }

    public JsonNode RequestUser(String login, String token){
        String url = url_verification + login;

        // Создаем заголовки
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON); // Может потребоваться установить другой тип, если нужно

        // Создаем запрос
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            return jsonNode;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return  null;
    }
}
