package com.camp.Buddy.service;

import com.camp.Buddy.model.Post;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class PostService {
    private static final String COLLECTION_TEAM_NAME = "posts";

  public String savePost(Post post) throws InterruptedException, ExecutionException {
    Firestore db = FirestoreClient.getFirestore();
    DocumentReference docRef = db.collection(COLLECTION_TEAM_NAME).document(); // Generates a new document ID

    // Create a map from the Post object
    Map<String, Object> postMap = new HashMap<>();
    postMap.put("teamName", post.getTeamName());
    postMap.put("likes", post.getLikes());
    postMap.put("date", post.getDate());
    postMap.put("urlPostImage", post.getUrlPostImage());
    postMap.put("teamNumber", post.getTeamNumber());
    postMap.put("urlAvatar", post.getUrlAvatar());
    postMap.put("comment", post.getComment());
    postMap.put("curator", post.getCurator());

    try {
      // Save the post to Firestore
      ApiFuture<WriteResult> resultApiFuture = docRef.set(postMap);
      return resultApiFuture.get().getUpdateTime().toString();
    } catch (Exception e) {
      System.err.println("Error saving post: " + e.getMessage());
      throw e; // Rethrow the exception to handle it in the controller
    }
  }

    public List<Post> getPostDetails() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        List<Post> postList = new ArrayList<>();
        CollectionReference documentReference = db.collection(COLLECTION_TEAM_NAME);
        documentReference.listDocuments().forEach(
                document -> {
                    ApiFuture<DocumentSnapshot> future = document.get();
                    DocumentSnapshot documentSnapshot = null;
                    try {
                        documentSnapshot = future.get();
                    } catch (InterruptedException | ExecutionException e) {
                        throw new RuntimeException(e);
                    }

                    if (documentSnapshot.exists()) {
                        postList.add(documentSnapshot.toObject(Post.class));
                    }
                }
        );
        return postList;
    }

};