package com.camp.Buddy.service;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseStorageService {

    @Value("${urlAvatarStandart}")
    private String url_;

    private final String BUCKET_NAME = "buddy-ea86a.appspot.com"; // Укажите имя вашего ведра

    public String uploadPhoto(MultipartFile photo, String path) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket(BUCKET_NAME);

        if (path.contains("profile")) {
            Iterable<Blob> blobs = bucket.list(Storage.BlobListOption.prefix(path)).getValues();
            for (Blob blob : blobs) {
                bucket.get(blob.getName()).delete();
            }
        }

        String fileName = path + System.currentTimeMillis() + "_" + photo.getOriginalFilename();
        bucket.create(fileName, photo.getInputStream(), photo.getContentType());
        String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
        return String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media", BUCKET_NAME, encodedFileName);
    }

    public String getPhotoUrl(String path) {
        Bucket bucket = StorageClient.getInstance().bucket(BUCKET_NAME);
        Iterable<Blob> blobs = bucket.list(Storage.BlobListOption.prefix("profile/"+path)).getValues();

        for (Blob blob : blobs) {
            String fileName = blob.getName();
            if (!fileName.endsWith("/")) {
                String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
                return String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media", BUCKET_NAME, encodedFileName);
            }
        }


        return url_; // Возвращаем стандартный URL, если файл не найден
    }
}
