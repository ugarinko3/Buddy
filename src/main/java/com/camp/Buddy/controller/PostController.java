package com.camp.Buddy.controller;

import com.camp.Buddy.model.Post;
import com.camp.Buddy.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("/add-post-in-curator")
    public ResponseEntity<Map<String, String>> addPost(
            @RequestParam("teamName") String teamName,
            @RequestParam("likes") int likes,
            @RequestParam("date") String date,
            @RequestParam("teamNumber") int teamNumber,
            @RequestParam("urlAvatar") String urlAvatar,
            @RequestParam("photo") String photo, // This will be the base64 string
            @RequestParam("comment") String comment,
            @RequestParam("curator") String curator) {

        Map<String, String> response = new HashMap<>();

        try {
            // Создаем объект Post
            Post post = new Post();
            post.setTeamName(teamName);
            post.setLikes(likes);
            post.setDate(date);
            post.setUrlPostImage(photo); // Assuming this is the image URL or base64
            post.setTeamNumber(teamNumber);
            post.setUrlAvatar(urlAvatar);
            post.setComment(comment);
            post.setCurator(curator);

            // Save the post using the PostService
            String result = postService.savePost(post);
            response.put("message", "Post added successfully");
            response.put("updateTime", result);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error adding post: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }


    @GetMapping
    public List<Post> getPost() throws ExecutionException, InterruptedException {
        return postService.getPostDetails();
    }
}
