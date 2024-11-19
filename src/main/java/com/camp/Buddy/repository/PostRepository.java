package com.camp.Buddy.repository;

import com.camp.Buddy.model.PostNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<PostNews, UUID> {
    List<PostNews> findAllByOrderByDateDesc();
    List<PostNews> findByLogin(String login);


    @Query("SELECT COUNT(p) FROM PostNews p GROUP BY p.login ORDER BY COUNT(p) DESC")
    List<Long> findAllPostCountsByLogin();
}
