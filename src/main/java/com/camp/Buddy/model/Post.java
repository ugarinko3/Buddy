package com.camp.Buddy.model;

import java.util.UUID;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "login")
    private String login;

    @Column(name = "likes")
    private Integer likes;

    @Column(name = "comment")
    private String comment;

    @Column(name = "date")
    private LocalDateTime date;

//    @Column(name = "team_number")
//    private Integer teamNumber;

    @Column(name = "url_avatar")
    private String urlAvatar;

    @Column(name = "url_post_image")
    private String urlPostImage;


//    public LocalDateTime parseDate() {
//        try {
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//            return LocalDateTime.parse(this.date, formatter);
//        } catch (DateTimeParseException e) {
//            e.printStackTrace();
//            return null;  // Возвращаем null в случае ошибки парсинга
//        }
//    }
//    public void setDate(LocalDateTime date) {
//
//    }
}
