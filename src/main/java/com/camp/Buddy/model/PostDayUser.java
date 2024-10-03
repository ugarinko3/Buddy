package com.camp.Buddy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="post_day_user")
public class PostDayUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name="id_day")
    private UUID idDay;

    @Column(name="role")
    private String role;

    @Column(name="login")
    private String login;

    @Column(name="comment")
    private String comment;

    @Column(name="date")
    private LocalDateTime date;

    @Column(name="url_avatar")
    private String urlAvatar;

    @Column(name="url_post")
    private String urlPost;

    @Column(name="status")
    private String status;

}
