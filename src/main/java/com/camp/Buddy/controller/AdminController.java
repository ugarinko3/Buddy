package com.camp.Buddy.controller;


import com.camp.Buddy.model.Team;
import com.camp.Buddy.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@AllArgsConstructor
@Controller
@RequestMapping("/admin")
public class AdminController {
    public final AdminService adminService;

    @PostMapping("/admin-create-curator")
    public ResponseEntity<String> createCurator(@RequestParam String login) {
        return adminService.createCurator(login);
    }

    @PostMapping("/admin-create-user")
    public ResponseEntity<String> createUser(@RequestParam String login) {
        return adminService.createUser(login);
    }

    @PostMapping("/generator-team")
    public ResponseEntity<String> generateCommand() {
        return adminService.generationCommand();
    }

    @GetMapping("/admin-getTeam")
    public ResponseEntity<List<Team>> getTeam() {
        return ResponseEntity.ok(adminService.getTeam());
    }

}
