package com.camp.Buddy.repository;

import com.camp.Buddy.model.Day;
import com.camp.Buddy.model.Post;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CalendarRepository extends JpaRepository<Day, UUID> {
    List<Day> findAllById(UUID id);
    List<Day> findAllByOrderByDateDesc();
    List<Day> findAllByOrderByDateAsc();

}