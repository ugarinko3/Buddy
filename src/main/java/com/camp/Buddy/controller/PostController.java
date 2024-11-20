package com.camp.Buddy.controller;

import com.camp.Buddy.model.PostNews;
import com.camp.Buddy.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.UUID;


@RequiredArgsConstructor
@RestController
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UUID> addPost(
            @RequestPart("post") PostNews postNews,
            @RequestParam("photo") MultipartFile photo
    ) throws IOException {
        return ResponseEntity.ok(postService.createPost(postNews, photo));
    }

    @GetMapping("/get")
    public ResponseEntity<List<PostNews>> getPosts(@RequestParam String login) {
        return ResponseEntity.ok(postService.getPostDetails(login));
    }

    @PostMapping("/like/{postId}")
    public ResponseEntity<Integer> likePost(@PathVariable UUID postId, @RequestParam String login) {
        return postService.likePost(postId, login);
    }

    @PostMapping("/unlike/{postId}")
    public ResponseEntity<Integer> unlikePost(@PathVariable UUID postId, @RequestParam String login) {
        return postService.unlikePost(postId, login);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
    }

}