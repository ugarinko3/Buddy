package com.camp.Buddy.repository;


import com.camp.Buddy.model.Goal;
import com.camp.Buddy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GoalsRepository extends JpaRepository<Goal, UUID> {
    Optional<Goal> findById(UUID id);
    List<Goal> findAllByUser(User user);
}
