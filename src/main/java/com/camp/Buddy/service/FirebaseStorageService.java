package com.camp.Buddy.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class FirebaseStorageService {

    @Value("${urlAvatarStandart}")
    private String url_;


    public final String PROFILE_FOlDER = "profile/";
    private final String BUCKET_NAME = "buddy-ea86a.appspot.com";
    public final String SEASON_FOLDER = "season/";

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
        Iterable<Blob> blobs = bucket.list(Storage.BlobListOption.prefix(PROFILE_FOlDER + path)).getValues();

        for (Blob blob : blobs) {
            String fileName = blob.getName();
            if (!fileName.endsWith("/")) {
                String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
                return String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media", BUCKET_NAME, encodedFileName);
            }
        }


        return url_;
    }

    public void uploadExcel(Workbook workbook, String fileName) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket(BUCKET_NAME);

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            workbook.write(outputStream);
            byte[] fileData = outputStream.toByteArray();

            String fullPath = SEASON_FOLDER + fileName;
            bucket.create(fullPath, fileData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

            URLEncoder.encode(fullPath, StandardCharsets.UTF_8);
        }
    }

    public ResponseEntity<List<String>> getExcel() {
        try {
            Bucket bucket = StorageClient.getInstance().bucket(BUCKET_NAME);
            List<String> fileNames = new ArrayList<>();
            Iterable<Blob> blobs = bucket.list(Storage.BlobListOption.prefix(SEASON_FOLDER)).getValues();
            for (Blob blob : blobs) {
                String fileName = blob.getName();
                if (!fileName.endsWith("/")) {
                    String cleanFileName = fileName.substring(SEASON_FOLDER.length());
                    fileNames.add(cleanFileName);
                }
            }

            return ResponseEntity.ok(fileNames);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    public String getFileUrl(String fileName) {
        Bucket bucket = StorageClient.getInstance().bucket(BUCKET_NAME);
        Blob blob = bucket.get(SEASON_FOLDER + fileName);
        if (blob != null) {
            String encodedFileName = URLEncoder.encode(blob.getName(), StandardCharsets.UTF_8);
            return String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media", BUCKET_NAME, encodedFileName);
        }
        return null;
    }
}
