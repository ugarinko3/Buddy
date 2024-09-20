package com.camp.Buddy.model;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostResponse {
    private Post post;
    private boolean isLiked;
    private String role;


}
