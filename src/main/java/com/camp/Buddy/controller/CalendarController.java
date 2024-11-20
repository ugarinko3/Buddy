package com.camp.Buddy.controller;


import com.camp.Buddy.model.*;
import com.camp.Buddy.model.response.CalendarResponse;
import com.camp.Buddy.model.response.PostDayUserResponse;
import com.camp.Buddy.service.CalendarService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/calendar")
public class CalendarController {
    private final CalendarService calendarService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UUID> addPostDay(
            @RequestPart("post") String postJson,
            @RequestPart("photo") MultipartFile photo
    ) throws IOException {
        PostDayUser postDayUser = new ObjectMapper().readValue(postJson, PostDayUser.class);
        return ResponseEntity.ok(calendarService.createPostDay(postDayUser, photo));
    }

    @GetMapping("/get-day/{idDay}")
    public ResponseEntity<List<PostDayUserResponse>> getDayPostCalendars(@RequestParam String login, @PathVariable UUID idDay) {
        return ResponseEntity.ok(calendarService.getDayPostCalendar(login, idDay));
    }

    @GetMapping("/get")
    public ResponseEntity<List<CalendarResponse>> getCalendars(@RequestParam String login) {
        List<CalendarResponse> calendarResponses = calendarService.getCalendar(login);
        return ResponseEntity.ok(calendarResponses);
    }

    @PostMapping("/create-comment")
    public void createCommentDay(@RequestBody Day day) {
        calendarService.createCommentDay(day);
    }

    @PostMapping("/change-of-status-active")
    public ResponseEntity<Void> changeStatus(@RequestBody PostDayUser postDayUser) {
        try {
            calendarService.selectStatus(postDayUser);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
