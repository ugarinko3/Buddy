package com.camp.Buddy.service;

import com.camp.Buddy.model.User;
import com.camp.Buddy.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CleaningService {

    private final TeamRepository teamRepository;
    private final UserDayRepository userDayRepository;
    private final CalendarRepository calendarRepository;
    private final CalendarDayRepository calendarDayRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;


    public void cleaningDataBase() {
        teamRepository.deleteAll();
        userDayRepository.deleteAll();
        calendarRepository.deleteAll();
        calendarDayRepository.deleteAll();
        postRepository.deleteAll();
        cleaningToken(userRepository.findAll());
    }

    private void cleaningToken(List<User> users) {
        for (User user : users){
            user.setToken(null);
        }
        userRepository.saveAll(users);
    }
}
