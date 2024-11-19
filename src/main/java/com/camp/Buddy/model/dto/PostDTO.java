package com.camp.Buddy.model.dto;


import com.camp.Buddy.model.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
public class PostDTO {

    private UUID id;
    private String teamName;
    private String login;
    private String comment;
    private LocalDateTime date;
    private String urlAvatar;
    private String urlPostImage;
    private Integer likes;
    private Set<String> likedByUsers;
    private boolean liked;
}
