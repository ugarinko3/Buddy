package com.camp.Buddy.controller;

import com.camp.Buddy.model.Season;
import com.camp.Buddy.service.SeasonService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@AllArgsConstructor
@RequestMapping("/season")
public class SeasonController {

    private final SeasonService seasonService;

    @PostMapping()
    public ResponseEntity<?> createSeason(@RequestBody Season season) {
        return seasonService.createSeason(season);
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestParam String login) {
        return seasonService.registrationUser(login);
    }
    @GetMapping
    public ResponseEntity<Season> getSeasonUser(@RequestParam String login) {
        return seasonService.getSeasonUser(login);
    }
    @GetMapping("/get-season")
    public ResponseEntity<Season> Season() {
        return seasonService.getSeason();
    }
}
