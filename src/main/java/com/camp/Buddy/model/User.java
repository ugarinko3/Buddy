package com.camp.Buddy.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "login")
    private String login;

//    @Column(name = "like_post")
//    private List<PostNews> likePost;
//    @ManyToMany
//    @JoinTable(
//            name = "user_likes_post",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "post_id"))
//    private List<PostNews> likedPosts;


    @ManyToMany
    @JoinTable(
            name = "user_season",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "season_id")
    )
    private List<Season> seasons;

    @Column(name = "token")
    private Integer token;

    @Column(name = "core_programm")
    private String coreProgramm;

    @Column(name = "xp")
    private Integer xp;

    @Column(name = "name")
    private String name;

    @Column(name = "telegram")
    private String telegram;

    @Column(name = "role")
    private String role;

    @Column(name = "urlAvatar")
    private String urlAvatar;
}
