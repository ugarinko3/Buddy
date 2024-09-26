package com.camp.Buddy.repository;

import com.camp.Buddy.model.Day;
import com.camp.Buddy.model.UserDayResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserDayRepository extends JpaRepository<UserDayResponse, Long> {
    List<UserDayResponse> findAllByUserId(UUID userId);
    List<UserDayResponse> findAllByDayId(UUID userId);
}
