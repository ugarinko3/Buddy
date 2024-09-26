package com.camp.Buddy.service;

import com.camp.Buddy.model.*;

import com.camp.Buddy.repository.CalendarDayRepository;
import com.camp.Buddy.repository.CalendarRepository;
import com.camp.Buddy.repository.UserDayRepository;
import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@AllArgsConstructor
@Service
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final CalendarDayRepository calendarDayRepository;


    private final UserRepository userRepository;
    private final UserDayRepository userDayRepository;
    private FirebaseStorageService firebaseStorageService;
    private final UserService userService;


    public List<CalendarResponse> getCalendar(String login) {
        List<Day> days = calendarRepository.findAllByOrderByDateAsc();
        Optional<User> userOptional = userRepository.findByLogin(login);
        User user = userOptional.get();
        List<UserDayResponse> userDayResponses = userDayRepository.findAllByUserId(user.getId());
        List<CalendarResponse> calendarResponses = new ArrayList<>();


        for (Day day : days) {
            Optional<UserDayResponse> userDayResponseOptional = userDayResponses.stream()
                    .filter(ud -> ud.getDay().equals(day))
                    .findFirst();
            UserDayResponse userDay = userDayResponseOptional.get();
            CalendarResponse calendarResponse = new CalendarResponse();
            calendarResponse.setDay(day);
//            if (day.getDate().isEqual(LocalDate.now())) {
//                userDay.setStatus("progress");
//                userDayRepository.save(userDay);
//            }  else {//if (day.getDate().isBefore(LocalDate.now())) {
//                calendarResponse.setStatus("active");
               // userDay.setStatus("active");
               // userDayRepository.save(userDay);
            //} else {
                calendarResponse.setStatus(userDayResponseOptional.map(UserDayResponse::getStatus).orElse("no-active"));
//            }
            calendarResponses.add(calendarResponse);

        }

        return calendarResponses;
    }

    public boolean createCalendar(CalendarRequest calendarRequest) {
        // Удалить все существующие дни
        calendarRepository.deleteAll();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate startDate = LocalDate.parse(calendarRequest.getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(calendarRequest.getEndDate(), formatter);

        List<Day> calendarEntities = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            Day day = new Day();
            day.setDate(date);
            calendarEntities.add(day);
        }

        // Сохраните все дни в репозитории
        calendarRepository.saveAll(calendarEntities);

        // Получите всех существующих пользователей
        List<User> users = userRepository.findAll(); // Предполагается, что у вас есть userRepository

        for (User user : users) {
            createCalendarUser(user, calendarEntities);
        }

        return true;
    }

    public void createCalendarUser(User user, List<Day> calendarEntities) {
        for (Day day : calendarEntities) {
            UserDayResponse userDay = new UserDayResponse();
            userDay.setUser(user);
            userDay.setDay(day);
            userDay.setStatus("no-active");
            userDayRepository.save(userDay);
        }
    }
    public void createCommentDay(Day day) {
        Optional<Day> optionalDay = calendarRepository.findById(day.getId());
        Day newDay = optionalDay.get();
        newDay.setComment(day.getComment());
        calendarRepository.save(newDay);
    }
    public UUID createPostDay(PostDayUser post, MultipartFile photo) throws IOException {
        String imageUrlPost = firebaseStorageService.uploadPhoto(photo, "posts/day/"+post.getId());
        post.setUrlPost(imageUrlPost);
        post.setUrlAvatar(userService.getAvatarUrlByLogin(post.getNameUser()));
        post.setDate(LocalDateTime.now());
        return calendarDayRepository.save(post).getId();
    }

    public List<PostDayUserResponse> getDayPostCalendar(String login, UUID idDay) {
        List<PostDayUser> postDayUsers = calendarDayRepository.findAllByIdDay(idDay);
        System.out.print(postDayUsers);
        List<PostDayUserResponse> postDayUserResponses = new ArrayList<>();

        for (PostDayUser post : postDayUsers) {
            PostDayUserResponse postResponse = new PostDayUserResponse();
            postResponse.setPostDayUser(post);
            postResponse.setAvailability(getPostUser(login));
            postDayUserResponses.add(postResponse);
        }
        return postDayUserResponses;
    }
    public boolean getPostUser(String login) {
        // Проверяем, существует ли пост по логину
        return calendarDayRepository.findByNameUser(login).isPresent();
    }

}

