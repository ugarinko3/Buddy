package com.camp.Buddy.model;

import com.google.firebase.database.core.Tag;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "post_news")  // Имя таблицы для PostNews
public class PostNews extends Post {

//    public PostNews(UUID id, String teamName, String login, String comment, LocalDateTime date, String urlAvatar, String urlPostImage, Integer likes, Set<User> likedByUsers, boolean liked) {
//        super(id, teamName, login, comment, date, urlAvatar, urlPostImage);
//        this.likes = likes;
//        this.likedByUsers = likedByUsers != null ? likedByUsers : new HashSet<>();  // Инициализация коллекции
//        this.liked = liked;
//    }

    @Column(name = "likes")
    private Integer likes;

    @OneToMany
    private Set<User> likedByUsers = new HashSet<>();;

    @Transient // Это поле не будет сохраняться в базе данных
    private boolean liked;

}