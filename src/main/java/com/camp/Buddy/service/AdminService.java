package com.camp.Buddy.service;

import com.camp.Buddy.model.Season;
import com.camp.Buddy.model.Team;
import com.camp.Buddy.model.User;
import com.camp.Buddy.repository.TeamRepository;
import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
@Log4j2
public class AdminService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    public ResponseEntity<String> createRole(String login, String role) {
        try {
            User user = userRepository.findByLogin(login);
            if (user != null) {
                user.setRole(role);
                userRepository.save(user);
                return ResponseEntity.ok(role + " created successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(role + " not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating " + role + ": " + e.getMessage());
        }
    }

    public List<Team> createTeam(List<User> curators) {
        List<Team> teams = new ArrayList<>();
        Set<User> users = new HashSet<>();
        for (int i = 0; i < curators.size(); i++) {
            Team team = new Team();
            String TEAM = "Team-";
            team.setName(TEAM + i + 1);
            team.setCurator(curators.get(i));
            team.setParticipants(users);
            teams.add(team);
        }
        return teams;
    }


    public void generationCommand(Season season) {
        int countTeam = 0;
        List<User> curators = userRepository.findAllBySeasonsAndRole(season, userService.CURATOR);
        List<User> users = userRepository.findAllBySeasonsAndRole(season, userService.USER);
        List<Team> teams = createTeam(curators);
        for (User user : users) {

            if (countTeam == curators.size()) {
                countTeam = 0;
            }
            teams.get(countTeam).getParticipants().add(user);
            countTeam++;
        }
        teamRepository.saveAll(teams);
    }


    public List<Team> getTeam() {
        return teamRepository.findAll();
    }
}
