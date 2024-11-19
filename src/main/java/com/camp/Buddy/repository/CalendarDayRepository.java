package com.camp.Buddy.repository;

import com.camp.Buddy.model.PostDayUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CalendarDayRepository extends JpaRepository<PostDayUser, UUID> {

    List<PostDayUser> findAllByIdDay(UUID dayId);
    List<PostDayUser> findAllByOrderByDateDesc();
    Boolean existsByIdDayAndLogin(UUID dayId, String login);
//    List<PostDayUser> findAllByNameUser(String login);
}
