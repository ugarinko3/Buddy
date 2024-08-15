package com.camp.Buddy.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.net.URL;

@Setter
@Getter
@AllArgsConstructor
public class TokenResponse {

  @JsonProperty("access_token")
  private String accessToken;

  // Конструктор будет сгенерирован Lombok
}
