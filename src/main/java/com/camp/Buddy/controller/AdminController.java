package com.camp.Buddy.controller;


import com.camp.Buddy.model.Team;
import com.camp.Buddy.service.AdminService;
import com.camp.Buddy.service.FirebaseStorageService;
import com.camp.Buddy.service.TeamService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Controller
@RequestMapping("/admin")
public class AdminController {

    private final FirebaseStorageService firebaseStorageService;
    private final AdminService adminService;
    private TeamService teamService;

    @PostMapping("/admin-create-role")
    public ResponseEntity<String> createRole(@RequestParam String login, @RequestParam String role) {
        return adminService.createRole(login, role);
    }

//    @PostMapping("/admin-create-user")
//    public ResponseEntity<String> createUser(@RequestParam String login) {
//        return adminService.createUser(login);
//    }

    @GetMapping("/get-excel")
    public ResponseEntity<List<String>> getExcel() {
        return firebaseStorageService.getExcel();
    }

    @GetMapping("/admin-getTeam")
    public ResponseEntity<List<Team>> getTeam() {
        return ResponseEntity.ok(adminService.getTeam());
    }

    @DeleteMapping("/delete-user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable UUID userId) {
        return teamService.deleteUser(userId);
    }

    @PostMapping("/add-team-and-user")
    public ResponseEntity<?> addTeamAndUser(@RequestParam UUID teamId,@RequestParam String login) {
        return teamService.addTeamAndUser(teamId, login);
    }

    @GetMapping("/download-file")
    public ResponseEntity<String> downloadFile(@RequestParam String nameFile) {
        try {
            return ResponseEntity.ok(firebaseStorageService.getFileUrl(nameFile));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching file: " + e.getMessage());
        }
    }
}
