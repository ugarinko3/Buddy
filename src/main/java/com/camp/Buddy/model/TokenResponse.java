package com.camp.Buddy.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenResponse {
  // Геттеры и сеттеры
  @JsonProperty("access_token")
  private String access_token;
  private String token_type;
  private int expires_in;

  public String getAccessToken() {
    return access_token;
  }

  public void setAccessToken(String accessToken) {
    this.access_token = accessToken;
  }
}