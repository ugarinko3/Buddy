package com.camp.Buddy.service;

import com.camp.Buddy.model.Team;
import com.camp.Buddy.repository.TeamRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public class TeamService {

    private TeamRepository teamRepository;

    public List<Team> getTeamsByParticipantId(UUID participantId) {
        return teamRepository.findTeamsByParticipantId(participantId);
    }

    public List<Team> getTeamsByCuratorId(UUID curatorId) {
        return teamRepository.findTeamsByCuratorId(curatorId);
    }
}
