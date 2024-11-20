package com.camp.Buddy.repository;

import com.camp.Buddy.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SeasonRepository extends JpaRepository<Season, UUID> {
    Season findByStatus(String status);

}
