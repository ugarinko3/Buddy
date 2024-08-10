package com.camp.Buddy.service;

import com.camp.Buddy.model.Post;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
@Log4j2
public class PostService {
    private static final String COLLECTION_TEAM_NAME = "posts";

    public String savePost(Post post) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> resultApiFuture = db.collection(COLLECTION_TEAM_NAME).document(post.getTeamName()).set(post);
        return resultApiFuture.get().getUpdateTime().toString();
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


//        Firestore db = FirestoreClient.getFirestore();
//        DocumentReference documentReference = db.collection(COLLECTION_TEAM_NAME).document();
//        ApiFuture<DocumentSnapshot> future = documentReference.get();
//        DocumentSnapshot document= future.get();
//
//        Product product = null;
//        if(document.exists()) {
//            product = document.toObject(Product.class);
//            return product;
//        } else {
//            return null;
//        }
