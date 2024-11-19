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
    private final ExcelServise excelServise;
    private final ModelMapper modelMapper;

    public UUID createPost(PostNews postNews, MultipartFile photo) throws IOException {
        String imageUrlPost = firebaseStorageService.uploadPhoto(photo, "posts/"+ postNews.getId());
        postNews.setUrlPostImage(imageUrlPost);
        postNews.setUrlAvatar(userService.getAvatarUrlByLogin(postNews.getLogin()));
        postNews.setDate(LocalDateTime.now());
        return postRepository.save(postNews).getId();
    }

    public List<PostNews> getPostDetails(String login) {
         List<PostNews> postNews = postRepository.findAllByOrderByDateDesc();
        User user = userRepository.findByLogin(login).get();
//
        List<PostNews> postDetails = new ArrayList<>();
        for(PostNews postNew : postNews) {
            if(postNew.getLikedByUsers().contains(user)) {
                postNew.setLiked(true);
            }
            postDetails.add(postNew);
        }
//       return  postDetails.stream().map(post->modelMapper.map(post, PostDTO.class)).toList();

        return postDetails;
    }

    public void deletePost(UUID id){
        postRepository.deleteById(id);
    }
    public ResponseEntity<Integer> likePost(UUID postId, String login){
//        PostNews postNews = postRepository.findById(postId)
//                .orElseThrow(() -> new NoSuchElementException("Post not found"));
//        postNews.setLikes(postNews.getLikes() + 1);
//        userService.getLike(postId, login);
//        postRepository.save(postNews);
//        System.out.println(postNews.getLikes());
//        return ResponseEntity.ok(postNews.getLikes());


        PostNews post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));
        User user = userRepository.findByLogin(login).orElseThrow(() -> new EntityNotFoundException("User not found"));


        if (!post.getLikedByUsers().contains(user)) {
            post.getLikedByUsers().add(user);
            post.setLikes(post.getLikes() + 1);
            postRepository.save(post);
//            System.out.println(post.getLikedByUsers());
        }

//        System.out.println(post.getLikedByUsers());
        return ResponseEntity.ok(post.getLikes());
    }

    public ResponseEntity<Integer> unlikePost(UUID postId, String login) {
        PostNews post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));
        User user = userRepository.findByLogin(login).orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (post.getLikedByUsers().contains(user)) {
            post.getLikedByUsers().remove(user);
            post.setLikes(post.getLikes() - 1);
            postRepository.save(post);
        }
        return ResponseEntity.ok(post.getLikes());
    }

};