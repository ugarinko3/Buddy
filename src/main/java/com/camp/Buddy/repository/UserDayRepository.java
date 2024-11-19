package com.camp.Buddy.repository;

import com.camp.Buddy.model.response.UserDayResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserDayRepository extends JpaRepository<UserDayResponse, Long> {
    List<UserDayResponse> findAllByUserId(UUID userId);
    List<UserDayResponse> findAllByDayId(UUID dayId);
//    PostDayUser findAllByUserName(String userName);
    UserDayResponse findByUserIdAndDayId(UUID userId, UUID dayId);

    @Query("SELECT u FROM UserDayResponse u JOIN u.day d WHERE u.user.id = :userId ORDER BY d.date ASC")
    List<UserDayResponse> findAllByUserIdSortedByDate(@Param("userId") UUID userId);

}
