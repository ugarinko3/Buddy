package com.camp.Buddy.repository;

import com.camp.Buddy.model.Season;
import com.camp.Buddy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByLogin(String login);
    List<User> findAllByRole(String role);
//    List<User> findAllBySeason(UUID season);
    List<User> findAllBySeasons(Season season);
    List<User> findAllBySeasonsAndRole(Season season, String role);

    @Query("SELECT u FROM User u WHERE u.token IS NOT NULL ORDER BY u.token DESC")
    List<User> findAllByToken();
}

