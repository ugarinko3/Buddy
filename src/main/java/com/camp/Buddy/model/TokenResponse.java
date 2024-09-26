package com.camp.Buddy.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.net.URL;
import java.util.UUID;

@Setter
@Getter
public class TokenResponse {
  private String role;
  private String login;
  private boolean create;
}
