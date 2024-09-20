package com.camp.Buddy.controller;

import com.camp.Buddy.service.LoginService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@Log4j2
@Controller
@AllArgsConstructor
@RequestMapping("/login")
public class LoginController {

  private LoginService loginService;

  @PostMapping
  public ResponseEntity<String> login(@RequestParam String login, @RequestParam String password) throws IOException, ExecutionException, InterruptedException {
    return loginService.login(login, password);
  }
}