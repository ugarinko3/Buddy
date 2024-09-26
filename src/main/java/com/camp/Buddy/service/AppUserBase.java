package com.camp.Buddy.service;

import com.camp.Buddy.model.Day;
import com.camp.Buddy.repository.CalendarRepository;
import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.camp.Buddy.model.User;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AppUserBase {
  private FirebaseStorageService firebaseStorageService;
  private final UserRepository userRepository;
  private final CalendarRepository calendarRepository ;
  private final CalendarService calendarService;

  public void addUser(String login) {
    String username = login.split("@")[0]; // Извлекаем имя пользователя из логина
    User user = new User();
    user.setLogin(username);
    user.setRole("user");
    user.setUrlAvatar(firebaseStorageService.getPhotoUrl(username));
    createUser(user);
  }
  public void createUser(User user) {
    Optional<User> existingUser = userRepository.findByLogin(user.getLogin());
    if (existingUser.isPresent()) {
      return;
    }
    user.setUrlAvatar(firebaseStorageService.getPhotoUrl(user.getLogin()));
    userRepository.save(user);
    List<Day> days = calendarRepository.findAll();
    if (!days.isEmpty()) {
      calendarService.createCalendarUser(user, days );
    }
  }
}
