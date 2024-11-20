package com.camp.Buddy.repository;

import com.camp.Buddy.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TeamRepository extends JpaRepository<Team, UUID> {


    @Query("SELECT t FROM Team t JOIN t.participants p WHERE p.id = :participantId")
    List<Team> findTeamsByParticipantId(@Param("participantId") UUID participantId);

    @Query("SELECT t FROM Team t WHERE t.curator.id = :curatorId")
    List<Team> findTeamsByCuratorId(@Param("curatorId") UUID curatorId);
}
