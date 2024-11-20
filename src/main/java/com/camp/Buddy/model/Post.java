package com.camp.Buddy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "comment")
    private String comment;

    @Column(name = "login")
    private String login;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "url_avatar")
    private String urlAvatar;

    @Column(name = "url_post_image")
    private String urlPostImage;
}