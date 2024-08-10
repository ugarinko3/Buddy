package com.camp.Buddy.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    private String teamName;
    private String curator;
    private int likes;
    private String comment;
    private String date;
    private int teamNumber;
    private String urlAvatar;
    private String urlPostImage;


    public LocalDateTime getDate() {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        return LocalDateTime.parse(date, formatter);
    }
//    public void setDate(LocalDateTime date) {
//
//    }
}
