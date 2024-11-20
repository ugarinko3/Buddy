package com.camp.Buddy.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EqualsAndHashCode
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "login")
    private String login;

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
