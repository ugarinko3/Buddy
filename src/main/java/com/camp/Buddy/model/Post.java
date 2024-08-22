package com.camp.Buddy.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static java.util.logging.Level.parse;

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


//    public String getDate() {
//
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
//        return String.valueOf(parse(date, formatter));
//    }

    public void setImageUrl(String imageUrl) {
        this.urlPostImage = imageUrl;
    }

    public String getImageUrl() {
        return urlPostImage;
    }
//    public void setDate(LocalDateTime date) {
//
//    }
}
