package com.camp.Buddy.repository;

import com.camp.Buddy.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SeasonRepository extends JpaRepository<Season, UUID> {
    List<Season> findAllByStatus(String status);
    Season findByStatus(String status);
    Season findByNumberSeason(Integer numberSeason);
    List<Season> findAllBy();

}
