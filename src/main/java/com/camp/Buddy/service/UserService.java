package com.camp.Buddy.service;

import com.camp.Buddy.model.*;
import com.camp.Buddy.model.Response.DayProfileResponse;
import com.camp.Buddy.model.Response.UserDayResponse;
import com.camp.Buddy.model.Response.UserResponse;
import com.camp.Buddy.repository.GoalsRepository;
import com.camp.Buddy.repository.TeamRepository;
import com.camp.Buddy.repository.UserDayRepository;
import com.camp.Buddy.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class UserService {

    private final TeamRepository teamRepository;
    private final TeamService teamService;
    private final GoalsRepository goalsRepository;
    private final UserDayRepository userDayRepository;
    private UserRepository userRepository;

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

            if (user.getRole().equals("user")) {
                teams = teamService.getTeamsByParticipantId(user.getId());
            } else if (user.getRole().equals("curator")) {
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



//    public List<String> getTeam(String login) {
//        try {
//            DocumentSnapshot document = userRepository.findById(login);
//            if (document.exists()) {
//                Optional<Map<String, Object>> optionalTeam = Optional.ofNullable((Map<String, Object>) document.get("team"));
//                return optionalTeam.map(stringObjectMap -> new ArrayList<>(stringObjectMap.keySet())).orElseGet(ArrayList::new);
//            } else {
//                throw new RuntimeException("Пользователь не найден");
//            }
//        } catch (InterruptedException | ExecutionException e) {
//            throw new RuntimeException("Ошибка при получении данных: " + e.getMessage(), e);
//        }
//    }

    public String getUserRole(String login) {
        Optional<User> userOptional = userRepository.findByLogin(login);

        if (userOptional.isPresent()) {
            return userOptional.get().getRole(); // Предполагается, что у вас есть метод getRole в классе User
        } else {
            throw new RuntimeException("Пользователь не найден");
        }
    }

    private List<String> getUserLikes(String login) {
        Optional<User> userOptional = userRepository.findByLogin(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<String> stringList = user.getLikePost();
            return stringList != null ? stringList : new ArrayList<>();
        }
        return new ArrayList<>();
    }

    public void getLike(UUID id, String login) {
        List<String> stringList = getUserLikes(login);
        String idString = id.toString();

        if (stringList.contains(idString)) {
            stringList.remove(idString);
        } else {
            stringList.add(idString);
        }

        // Сохраняем обновленный список лайков
        Optional<User> userOptional = userRepository.findByLogin(login);
        userOptional.ifPresent(user -> {
            user.setLikePost(stringList);
            userRepository.save(user);
        });
    }

    public boolean checkLikePost(UUID id, String login) {
        List<String> stringList = getUserLikes(login);
        String idString = id.toString();
        return stringList.contains(idString);
    }

//    public <List> Day getDay(){
//
//    }


}
