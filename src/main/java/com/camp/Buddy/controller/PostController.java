package com.camp.Buddy.controller;


import com.camp.Buddy.model.Post;
import com.camp.Buddy.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping
    public String savePost(@RequestBody Post post) throws ExecutionException, InterruptedException {
        return postService.savePost(post);
    }

    @GetMapping
    public List<Post> getPost() throws ExecutionException, InterruptedException {
        return postService.getPostDetails();
    }

}
