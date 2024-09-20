package com.camp.Buddy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "login")
    private String login;

    @Column(name = "array_command")
    private List<String> arrayCommand;

    @Column(name = "like_post")
    private List<String> likePost;

    @Column(name = "role")
    private String role;

    @Column(name = "urlAvatar")
    private String urlAvatar;
//
//    @Column(name = "team")
//    private String team;
}
