package com.camp.Buddy.service;

import com.camp.Buddy.model.*;
import com.camp.Buddy.model.response.DayProfileResponse;
import com.camp.Buddy.model.response.UserDayResponse;
import com.camp.Buddy.model.response.UserInfoResponse;
import com.camp.Buddy.model.response.UserResponse;
import com.camp.Buddy.repository.*;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@AllArgsConstructor
@Service
public class UserService {

    private final TeamService teamService;
    private final RequestSchoolService requestSchoolService;
    private final GoalsRepository goalsRepository;
    private final UserDayRepository userDayRepository;
    private final CalendarRepository calendarRepository;
    private FirebaseStorageService firebaseStorageService;
    private final UserRepository userRepository;

    public final String ADMIN = "admin";
    public final String USER = "user";
    public final String CURATOR = "curator";


    public String getAvatarUrlByLogin(String login) {
        return userRepository.findByLogin(login)
                .map(User::getUrlAvatar) // Предполагается, что у вас есть метод getUrlAvatar в классе User
                .orElse(null); // Или выбросьте исключение, если пользователь не найден
    }

    public UserResponse getUser(String login) throws EntityNotFoundException {
        UserResponse userProfile = new UserResponse();
        Optional<User> userOptional = userRepository.findByLogin(login);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userProfile.setUser(user);

            List<Team> teams;

            if (user.getRole().equals(USER)) {
                teams = teamService.getTeamsByParticipantId(user.getId());
            } else if (user.getRole().equals(CURATOR)) {
                teams = teamService.getTeamsByCuratorId(user.getId());
            } else {
                teams = teamService.getTeamsByCuratorId(user.getId());
            }
            userProfile.setGoals(goalsRepository.findAllByUser(user));
            List<UserDayResponse> userDayResponses = userDayRepository.findAllByUserId(user.getId());
            userProfile.setDays(changeDayProfile(userDayResponses));

            userProfile.setTeam(teams);
        } else {
            throw new EntityNotFoundException("User not found");
        }

        return userProfile; // Возвращаем объект UserResponse
    }

    public List<DayProfileResponse> changeDayProfile(List<UserDayResponse> userDayResponses) {
        List<DayProfileResponse> dayProfileResponses = new ArrayList<>();
        for (UserDayResponse userDayResponse : userDayResponses) {
            DayProfileResponse dayProfileResponse = new DayProfileResponse();
            dayProfileResponse.setDate(userDayResponse.getDay().getDate());
            dayProfileResponse.setStatus(userDayResponse.getStatus());
            dayProfileResponses.add(dayProfileResponse);
        }
        return dayProfileResponses;
    }


    public List<String> getTeam(String login) {
        List<Team> teams = teamService.getTeamsByCuratorId(userRepository.findByLogin(login).get().getId());
        List<String> teamNames = new ArrayList<>();
        for (Team team : teams) {
            teamNames.add(team.getName());
        }
        return teamNames;
    }

    public String getUserRole(String login) {
        Optional<User> userOptional = userRepository.findByLogin(login);

        if (userOptional.isPresent()) {
            return userOptional.get().getRole(); // Предполагается, что у вас есть метод getRole в классе User
        } else {
            throw new RuntimeException("Пользователь не найден");
        }
    }

//    private List<String> getUserLikes(String login) {
//        Optional<User> userOptional = userRepository.findByLogin(login);
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            List<String> stringList = user.getLikePost();
//            return stringList != null ? stringList : new ArrayList<>();
//        }
//        return new ArrayList<>();
//    }

//    public void getLike(UUID id, String login) {
//        List<String> stringList = getUserLikes(login);
//        String idString = id.toString();
//
//        if (stringList.contains(idString)) {
//            stringList.remove(idString);
//        } else {
//            stringList.add(idString);
//        }
//
//        // Сохраняем обновленный список лайков
//        Optional<User> userOptional = userRepository.findByLogin(login);
//        userOptional.ifPresent(user -> {
//            user.setLikePost(stringList);
//            userRepository.save(user);
//        });
//    }

//    public boolean checkLikePost(UUID id, String login) {
//        List<String> stringList = getUserLikes(login);
//        String idString = id.toString();
//        return stringList.contains(idString);
//    }

    public int addUser(String login, String accessToken) {
        int result = 1;
        JsonNode jsonNode = requestSchoolService.RequestUser(login, accessToken);

        String username = login.split("@")[0]; // Извлекаем имя пользователя из логина
        if (!userRepository.findByLogin(username).isPresent()) {
            User user = new User();
            user.setLogin(username);
            user.setRole(USER);
            user.setUrlAvatar(firebaseStorageService.getPhotoUrl(username));
            user.setXp(jsonNode.get("expValue").asInt());
            user.setCoreProgramm(jsonNode.get("className").asText());
            userRepository.save(user);
            result = 0;
        }
        User user = userRepository.findByLogin(username).get();
        if (user.getTelegram() == null && user.getName() == null) {
            result = 0;
        }

        return result;
    }

    public void createCalendar(User user) {
        List<Day> days = calendarRepository.findAll();
        if (!days.isEmpty()) {
            createCalendarUser(user, days);
        }
    }

    public void createCalendarUser(User user, List<Day> calendarEntities) {
        for (Day day : calendarEntities) {
            UserDayResponse userDay = new UserDayResponse();
            userDay.setUser(user);
            userDay.setDay(day);
            userDay.setStatus("no-active");
            userDayRepository.save(userDay);
        }
    }

    public void createToken(User user, User curator) {
        if (curator.getToken() == null) {
            curator.setToken(0);
        }
        if (user.getToken() == null) {
            user.setToken(0);
        }
        curator.setToken(curator.getToken() + 5);
        user.setToken(user.getToken() + 25);
        userRepository.save(user);
        userRepository.save(curator);
    }

    public ResponseEntity<List<User>> getTournament() {
        try {
            return ResponseEntity.ok(userRepository.findAllByToken());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Integer> createTelegram(UserInfoResponse userInfoResponse) {
        try {
            User user = userRepository.findByLogin(userInfoResponse.getLogin()).get();
            user.setTelegram(userInfoResponse.getTelegram());
            user.setName(userInfoResponse.getName());
            userRepository.save(user);
            return ResponseEntity.ok(0);
        } catch (Exception e) {
            return ResponseEntity.ok(1);
        }
    }

    public ResponseEntity<?> createAvatar(MultipartFile photo, String login) throws IOException {
        User user = userRepository.findByLogin(login).get();
        String path = "profile/" + login + "/";
        String urlAvatar = firebaseStorageService.uploadPhoto(photo, path);
        user.setUrlAvatar(urlAvatar);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
