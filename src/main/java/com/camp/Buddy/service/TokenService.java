package com.camp.Buddy.service;

import com.camp.Buddy.model.response.TokenResponse;
import com.camp.Buddy.repository.CalendarRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

//@AllArgsConstructor
@Service
public class TokenService {

    private final RestTemplate restTemplate;
    private final String url_verification;
    private final UserService userService;
    private final CalendarRepository calendarRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public TokenService(RestTemplate restTemplate, @Value("${url_verification}") String url_verification, UserService userService, CalendarRepository calendarRepository) {
        this.restTemplate = restTemplate;
        this.url_verification = url_verification;
        this.userService = userService;
        this.calendarRepository = calendarRepository;
    }

    public TokenResponse statusToken(String token, String login) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Accept", "*/*");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = url_verification + login;
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            String loginName = login.split("@")[0];
            TokenResponse tokenResponse = new TokenResponse();
                tokenResponse.setRole(userService.getUserRole(loginName));
                tokenResponse.setLogin(loginName);
            tokenResponse.setCreate(isTableExists("day") && !calendarRepository.findAll().isEmpty());

            return tokenResponse;
        }
        return null;
    }
    private boolean isTableExists(String tableName) {
        try {
            // Выполняем запрос для проверки существования таблицы
            Long count = (Long) entityManager.createNativeQuery("SELECT COUNT(*) FROM information_schema.tables WHERE table_name = :tableName")
                    .setParameter("tableName", tableName)
                    .getSingleResult();
            return count > 0;
        } catch (Exception e) {
            // Обработка исключений, если таблица не существует или произошла ошибка
            return false;
        }
    }
}
