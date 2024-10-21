package com.camp.Buddy.service;

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
//            String teamName = "Team-" + teamRepository.findAll().size() + 1;
//            if (teamRepository.existsByName(teamName)) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Team with this name already exists.");
//            }
            // Получение всех кураторов из базы данных по роли
            List<User> curators = userRepository.findAllByRole("curator");
            if (curators.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No curators available to assign.");
            }

            // Выбор случайного куратора
//            User curator = curators.get(random.nextInt(curators.size()));

            // Получение всех обычных пользователей
            List<User> allUsers = userRepository.findAllByRole("user"); // Предполагается, что у вас есть метод для поиска обычных пользователей
            if (allUsers.size() < 1) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not enough users available to assign.");
            }

            // Выбор 5 случайных пользователей
            for (int i = 0; i < curators.size(); i++){
                String teamName = "Team-" + (teamRepository.findAll().size() + 1);
                Set<User> participants = new HashSet<>();
                while (participants.size() < 1) {
                    User user = allUsers.get(i);
                    participants.add(user);
                    log.error(participants);

                }

                Team team = new Team();
                team.setName(teamName);
                team.setCurator(curators.get(i));
                team.setParticipants(participants);

                teamRepository.save(team);
            }

            return ResponseEntity.ok("Command created with ID: ");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating command: " + e.getMessage());
        }
    }

    public List<Team> getTeam() {
        return teamRepository.findAll();
    }
}
