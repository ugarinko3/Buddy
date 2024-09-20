package com.camp.Buddy.service;

import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.camp.Buddy.model.User;

import java.util.Optional;

@AllArgsConstructor
@Service
public class AppUserBase {
  private FirebaseStorageService firebaseStorageService;
  private UserService userService;
  private final UserRepository userRepository;

  public void addUser(String login) {
    String username = login.split("@")[0]; // Извлекаем имя пользователя из логина
    User user = new User();
    user.setLogin(username);
    user.setRole("user");
    user.setUrlAvatar(firebaseStorageService.getPhotoUrl(username));
    userService.createUser(user);
  }
}
