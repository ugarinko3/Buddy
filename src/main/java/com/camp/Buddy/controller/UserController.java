package com.camp.Buddy.controller;

import com.camp.Buddy.model.Goal;
import com.camp.Buddy.model.response.ErrorResponse;
import com.camp.Buddy.model.User;
import com.camp.Buddy.model.response.UserInfoResponse;
import com.camp.Buddy.service.GoalService;
import com.camp.Buddy.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final GoalService goalService;
    private UserService userService;

    @GetMapping("/role-user-cur/{id}")
    public ResponseEntity<?> getUserRole(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserRole(id));
    }

    @PostMapping("/telegram")
    public ResponseEntity<Integer> createTelegram(@RequestBody UserInfoResponse UserInfo) {
        return userService.createTelegram(UserInfo);
    }


    @GetMapping("/profile/{login}")
    public ResponseEntity<?> getProfile(@PathVariable String login) {
        try {
            return ResponseEntity.ok(userService.getUser(login));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Пользователь не найден"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Произошла непредвиденная ошибка"));
        }
    }

    @PostMapping("/profile/createGoal")
    public ResponseEntity<?> setCreateGoal(@RequestBody Goal goal) {
        return goalService.creteGoalUser(goal);
    }

    @PostMapping("/profile/statusGoal")
    public ResponseEntity<?> setStatusGoal(@RequestBody Goal goal) throws Exception {
        return goalService.setStatusGoal(goal);
    }

    @PostMapping("/profile/deleteGoal")
    public void deleteGoal(@RequestBody Goal goal) {
        goalService.deleteGoal(goal);
    }

    @GetMapping("/tournament")
    public ResponseEntity<List<User>> getTournament() {
        return userService.getTournament();
    }


    @GetMapping("/team/{login}")
    public ResponseEntity<List<String>> getTeamPost(@PathVariable String login) {
        try {
            List<String> teamDetails = userService.getTeam(login);
            return ResponseEntity.ok(teamDetails);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonList(e.getMessage()));
        }
    }

    @PostMapping("/profile/createAvatar")
    public ResponseEntity<?> createAvatar(@RequestParam("avatar") MultipartFile file,
                                          @RequestParam("login") String login) throws Exception {

        return userService.createAvatar(file, login);
    }
}
