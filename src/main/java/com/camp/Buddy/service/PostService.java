package com.camp.Buddy.service;

import com.camp.Buddy.model.Post;
import com.camp.Buddy.model.PostResponse;
import com.camp.Buddy.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@AllArgsConstructor
@Service
public class PostService {
    private final UserService userService;
    private PostRepository postRepository;
    private FirebaseStorageService firebaseStorageService;

    public UUID createPost(Post post, MultipartFile photo) throws IOException {
        String imageUrlPost = firebaseStorageService.uploadPhoto(photo, "posts/"+post.getId());
        post.setUrlPostImage(imageUrlPost);
        post.setUrlAvatar(userService.getAvatarUrlByLogin(post.getCurator()));
        post.setDate(LocalDateTime.now());
        return postRepository.save(post).getId();
    }

    public List<PostResponse> getPostDetails(String login) {
        List<Post> posts = postRepository.findAllByOrderByDateDesc();
        List<PostResponse> postResponses = new ArrayList<>();

        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();
            postResponse.setPost(post);
            postResponse.setLiked(userService.checkLikePost(post.getId(), login));
            postResponse.setRole(userService.getUserRole(login));
            postResponses.add(postResponse);
        }

        return postResponses;
    }

    public void deletePost(UUID id){
        postRepository.deleteById(id);
    }
    public void likePost(UUID postId, String login) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
        post.setLikes(post.getLikes() + 1);
        userService.getLike(postId, login);
        postRepository.save(post);
    }

    public void unlikePost(UUID postId, String login) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
        if (post.getLikes() > 0) {
            post.setLikes(post.getLikes() - 1);
            userService.getLike(postId, login);
        }
        postRepository.save(post);
    }

};