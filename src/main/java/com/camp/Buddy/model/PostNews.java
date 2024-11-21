package com.camp.Buddy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "post_news")
public class PostNews extends Post {

    @Column(name = "likes")
    private Integer likes;

    @OneToMany
    private Set<User> likedByUsers = new HashSet<>();

    @Transient
    private boolean liked;

}