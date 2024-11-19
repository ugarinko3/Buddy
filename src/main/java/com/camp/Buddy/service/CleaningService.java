package com.camp.Buddy.service;

import com.camp.Buddy.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CleaningService {

    private final TeamRepository teamRepository;
    private final UserDayRepository userDayRepository;
    private final CalendarRepository calendarRepository;
    private final CalendarDayRepository calendarDayRepository;
    private final PostRepository postRepository;


    public void cleaningDataBase() {
        teamRepository.deleteAll();
        userDayRepository.deleteAll();
        calendarRepository.deleteAll();
        calendarDayRepository.deleteAll();
        postRepository.deleteAll();
    }
}
