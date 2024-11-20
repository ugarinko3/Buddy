package com.camp.Buddy.service;

import com.camp.Buddy.model.PostNews;
import com.camp.Buddy.model.User;
import com.camp.Buddy.repository.PostRepository;
import com.camp.Buddy.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@AllArgsConstructor
@Service
public class PostService {
    private final UserService userService;

    private final UserRepository userRepository;
    private PostRepository postRepository;
    private FirebaseStorageService firebaseStorageService;

    public UUID createPost(PostNews postNews, MultipartFile photo) throws IOException {
        String imageUrlPost = firebaseStorageService.uploadPhoto(photo, "posts/"+ postNews.getId());
        postNews.setUrlPostImage(imageUrlPost);
        postNews.setUrlAvatar(userService.getAvatarUrlByLogin(postNews.getLogin()));
        postNews.setDate(LocalDateTime.now());
        return postRepository.save(postNews).getId();
    }

    public List<PostNews> getPostDetails(String login) {
         List<PostNews> postNews = postRepository.findAllByOrderByDateDesc();
        User user = userRepository.findByLogin(login);
//
        List<PostNews> postDetails = new ArrayList<>();
        for(PostNews postNew : postNews) {
            if(postNew.getLikedByUsers().contains(user)) {
                postNew.setLiked(true);
            }
            postDetails.add(postNew);
        }

        return postDetails;
    }

    public void deletePost(UUID id){
        postRepository.deleteById(id);
    }
    public ResponseEntity<Integer> likePost(UUID postId, String login){


        PostNews post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));
        User user = userRepository.findByLogin(login);


        if (!post.getLikedByUsers().contains(user)) {
            post.getLikedByUsers().add(user);
            post.setLikes(post.getLikes() + 1);
            postRepository.save(post);
        }

        return ResponseEntity.ok(post.getLikes());
    }

    public ResponseEntity<Integer> unlikePost(UUID postId, String login) {
        PostNews post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));
        User user = userRepository.findByLogin(login);

        if (post.getLikedByUsers().contains(user)) {
            post.getLikedByUsers().remove(user);
            post.setLikes(post.getLikes() - 1);
            postRepository.save(post);
        }
        return ResponseEntity.ok(post.getLikes());
    }

};