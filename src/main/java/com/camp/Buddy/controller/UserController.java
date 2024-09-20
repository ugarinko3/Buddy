package com.camp.Buddy.controller;

import com.camp.Buddy.service.UserService;
import com.google.firebase.remoteconfig.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/role-user-cur/{id}")
    public ResponseEntity<?> getUserRole(@PathVariable String id) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(userService.getUserRole(id));
    }

    @PostMapping("/checklike/{postId}")
    public boolean checkLikePost(@PathVariable UUID postId, @RequestParam String login) {
        return userService.checkLikePost(postId, login);
    }
//    @GetMapping("/team/{id}")
//    public ResponseEntity<List<String>> getTeamPost(@PathVariable String id) {
//        try {
//            List<String> teamDetails = userService.getTeam(id);
//            return ResponseEntity.ok(teamDetails);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body(Collections.singletonList(e.getMessage()));
//        }
//    }
}
