package com.camp.Buddy.service;

import com.camp.Buddy.model.Team;
import com.camp.Buddy.model.User;
import com.camp.Buddy.repository.TeamRepository;
import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AdminService {

    public final UserRepository userRepository;
    public final TeamRepository teamRepository;
    private final Random random = new Random();


    public ResponseEntity<String> createCurator(String login) {
        try {
            Optional<User> user = userRepository.findByLogin(login);
            if (user.isPresent()) {
                user.get().setRole("curator");
                userRepository.save(user.get());
                return ResponseEntity.ok("Curator created successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curator not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating curator: " + e.getMessage());
        }
    }

    public ResponseEntity<String> createUser(String login) {

        try {
            Optional<User> user = userRepository.findByLogin(login);
            if (user.isPresent()) {
                user.get().setRole("user");
                userRepository.save(user.get());
                return ResponseEntity.ok("User created successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user: " + e.getMessage());
        }
    }


    public ResponseEntity<String> generationCommand() {
        try {
            // Генерация случайного имени команды
            String teamName = "Team-" + UUID.randomUUID().toString().substring(0, 8);
            if (teamRepository.existsByName(teamName)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Team with this name already exists.");
            }
            // Получение всех кураторов из базы данных по роли
            List<User> curators = userRepository.findByRole("curator");
            if (curators.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No curators available to assign.");
            }

            // Выбор случайного куратора
            User curator = curators.get(random.nextInt(curators.size()));

            // Получение всех обычных пользователей
            List<User> allUsers = userRepository.findByRole("user"); // Предполагается, что у вас есть метод для поиска обычных пользователей
            if (allUsers.size() < 1) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not enough users available to assign.");
            }

            // Выбор 5 случайных пользователей
            List<User> participants = new ArrayList<>();
            while (participants.size() < 1) {
                User user = allUsers.get(random.nextInt(allUsers.size()));
                if (!participants.contains(user)) { // Проверка на уникальность
                    participants.add(user);
                }
            }

            Team team = new Team();
            team.setName(teamName);
            team.setCurator(curator);
            team.setParticipants(participants);

            teamRepository.save(team);
            return ResponseEntity.ok("Command created with ID: " + team.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating command: " + e.getMessage());
        }
    }

    public List<Team> getTeam() {
        return teamRepository.findAll();
    }
}
