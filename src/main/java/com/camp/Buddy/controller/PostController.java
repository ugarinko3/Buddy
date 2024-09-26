package com.camp.Buddy.controller;

import com.camp.Buddy.model.Post;
import com.camp.Buddy.model.PostResponse;
import com.camp.Buddy.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.io.IOException;
import java.util.List;
import java.util.UUID;


@RequiredArgsConstructor
@RestController
@RequestMapping("/post")
public class PostController {

    private final PostService postService;
//    private final ObjectMapper objectMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UUID> addPost(
            @RequestPart("post") Post post,  // Получаем JSON-строку
            @RequestParam("photo") MultipartFile photo  // файл
    ) throws IOException {
//        Post post = objectMapper.readValue(postJson, Post.class); // Десериализация JSON в объект Post
        return ResponseEntity.ok(postService.createPost(post, photo));
    }

    @GetMapping("/get")
    public ResponseEntity<List<PostResponse>> getPosts(@RequestParam String login) {
        return ResponseEntity.ok(postService.getPostDetails(login));
    }

    @PostMapping("/like/{postId}")
    public void likePost(@PathVariable UUID postId, @RequestParam String login) {
        postService.likePost(postId, login);
    }
    @PostMapping("/unlike/{postId}")
    public void unlikePost(@PathVariable UUID postId, @RequestParam String login) {
        postService.unlikePost(postId, login);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
    }

}