package com.camp.Buddy.service;

import com.camp.Buddy.model.Team;
import com.camp.Buddy.model.User;
import com.camp.Buddy.repository.TeamRepository;
import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@Service
public class TeamService {

    private final UserRepository userRepository;
    private TeamRepository teamRepository;

    public List<Team> getTeamsByParticipantId(UUID participantId) {
        return teamRepository.findTeamsByParticipantId(participantId);
    }

    public List<Team> getTeamsByCuratorId(UUID curatorId) {
        return teamRepository.findTeamsByCuratorId(curatorId);
    }

    public ResponseEntity<?> deleteUser(UUID participantId) {
        try {
            User user = userRepository.findById(participantId).get();
            List<Team> team = teamRepository.findTeamsByParticipantId(participantId);
            Set<User> users = team.get(0).getParticipants();
            users.remove(user);
            team.get(0).setParticipants(users);
            teamRepository.save(team.get(0));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<?> addTeamAndUser(UUID idTeam, String login) {
        try{
            Optional<User> optionalUser = userRepository.findByLogin(login);
            if (!optionalUser.isPresent()) {
                return ResponseEntity.badRequest().body("Пользователь не найден");
            }
            List<Team> teams = teamRepository.findTeamsByParticipantId(userRepository.findByLogin(login).get().getId());
            if (teams.size() == 0) {
                Team team = teamRepository.findById(idTeam).get();
                Set<User> users = team.getParticipants();
                users.add(optionalUser.get());
                team.setParticipants(users);
                teamRepository.save(team);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.badRequest().body("Пользователь уже состоит в команде");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
