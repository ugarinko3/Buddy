package com.camp.Buddy.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class AppUserBase {

  private static final String COLLECTION_NAME = "users";

  public static void addUser(String login) throws InterruptedException, ExecutionException {
    Firestore db = FirestoreClient.getFirestore();
    String username = login.split("@")[0];
    DocumentReference docRef = db.collection(COLLECTION_NAME).document(username);

    DocumentSnapshot document = docRef.get().get();

    if (!document.exists()) {
      Map<String, Object> user = new HashMap<>();
      user.put("login", login);
      user.put("role", "user");
      ApiFuture<WriteResult> resultApiFuture = docRef.set(user);
    }
  }
}
