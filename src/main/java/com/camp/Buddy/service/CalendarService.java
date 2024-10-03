package com.camp.Buddy.service;

import com.camp.Buddy.model.*;

import com.camp.Buddy.repository.CalendarDayRepository;
import com.camp.Buddy.repository.CalendarRepository;
import com.camp.Buddy.repository.UserDayRepository;
import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@AllArgsConstructor
@Service
public class CalendarService {

    private final FirebaseStorageService firebaseStorageService;
//    private final UserDayResponse userDayResponse;
    private final CalendarRepository calendarRepository;
    private final CalendarDayRepository calendarDayRepository;
    private final UserDayRepository userDayRepository;
    private final UserRepository userRepository;
    private final UserService userService;


    public List<CalendarResponse> getCalendar(String login) {
        List<Day> days = calendarRepository.findAllByOrderByDateAsc();
        if (!days.isEmpty()) {
            Optional<User> userOptional = userRepository.findByLogin(login);
            User user = userOptional.get();
            List<UserDayResponse> userDayResponses = userDayRepository.findAllByUserId(user.getId());
            List<CalendarResponse> calendarResponses = new ArrayList<>();


            for (Day day : days) {
                Optional<UserDayResponse> userDayResponseOptional = userDayResponses.stream()
                        .filter(ud -> ud.getDay().equals(day))
                        .findFirst();
                selectDay(day);
//                UserDayResponse userDay = userDayResponseOptional.get();
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
        return null;
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
            day.setStatus("no-active");
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
        User user = userRepository.findByLogin(post.getLogin()).get();
        changeDayCalendar(user.getId(), post.getIdDay(), "Process");
        post.setUrlPost(imageUrlPost);
        post.setUrlAvatar(userService.getAvatarUrlByLogin(post.getLogin()));
        post.setStatus("Process");

        post.setDate(LocalDateTime.now());
        return calendarDayRepository.save(post).getId();
    }

    public List<PostDayUserResponse> getDayPostCalendar(String login, UUID idDay) {
        List<PostDayUser> postDayUsers = calendarDayRepository.findAllByIdDay(idDay);
        Day day = calendarRepository.findById(idDay).get();
        List<PostDayUserResponse> postDayUserResponses = new ArrayList<>();

        boolean isUserAvailable = getPostUser(idDay, login);

        if (postDayUsers.isEmpty()) {
            PostDayUserResponse availabilityResponse = new PostDayUserResponse();
            availabilityResponse.setAvailability(isUserAvailable); // Устанавливаем availability
            availabilityResponse.setMessagePost(day.getComment());
            postDayUserResponses.add(availabilityResponse);
        }
        for (PostDayUser post : postDayUsers) {
            PostDayUserResponse postResponse = new PostDayUserResponse();
            postResponse.setPostDayUser(post);
            postResponse.setAvailability(isUserAvailable);
//            postResponse.setMessagePost(day.getComment());
            postDayUserResponses.add(postResponse);
        }


        return postDayUserResponses;
    }

    public boolean getPostUser(UUID id, String login) {
        return calendarDayRepository.existsByIdDayAndLogin(id, login);
    }
    public void failPostUser(PostDayUser postDayUser) {
        Optional<User> optionalUser = userRepository.findByLogin(postDayUser.getLogin());
        User user = optionalUser.get();
        changeDayCalendar(user.getId(), postDayUser.getIdDay(), "Fail");
        postDayUser.setStatus("Fail");
        calendarDayRepository.save(postDayUser);
    }
    public void successPostUser(PostDayUser postDayUser) {
        Optional<User> optionalUser = userRepository.findByLogin(postDayUser.getLogin());
        User user = optionalUser.get();
        changeDayCalendar(user.getId(), postDayUser.getIdDay(), "Success");
        postDayUser.setStatus("Success");
        calendarDayRepository.save(postDayUser);
}
//    public void processPostUser(PostDayUser postDayUser) {
//        Optional<User> optionalUser = userRepository.findByLogin(postDayUser.getLogin());
//        User user = optionalUser.get();
//        UserDayResponse dayUserCalendar = userDayRepository.findByUserIdAndDayId(user.getId(), postDayUser.getIdDay());
//        dayUserCalendar.setStatus("Process");
//        userDayRepository.save(dayUserCalendar);
//    }

    public void changeDayCalendar(UUID idUser, UUID idDay, String status) {
        UserDayResponse dayUserCalendar = userDayRepository.findByUserIdAndDayId(idUser, idDay);
        dayUserCalendar.setStatus(status);
//        System.out.println(dayUserCalendar.getStatus());
        userDayRepository.save(dayUserCalendar);
//        System.out.print(userDayRepository.findByUserIdAndDayId(idUser, idDay).getStatus());

    }

    public void selectStatus(PostDayUser postDayUser) {
        if ("successes".equals(postDayUser.getStatus())) {
            successPostUser(postDayUser);
        } else {
            failPostUser(postDayUser);
        }
    }

    public void selectDay(Day day){
        LocalDate currentDate = LocalDate.now();
//        List<Day> days = calendarRepository.findAllByOrderByDateAsc();
//        log.info("{}{}{}", day.getDate(), "no-active".equals(day.getStatus()), day.getStatus());
        if (currentDate.equals(day.getDate()) && "no-active".equals(day.getStatus())) {
            day.setStatus("active");
            calendarRepository.save(day);
            List<UserDayResponse> userDayResponseList = userDayRepository.findAllByDayId(day.getId());
            for (UserDayResponse userDayResponse : userDayResponseList) {
                userDayResponse.setStatus("active");
                userDayRepository.save(userDayResponse);
            }

        };

//        for (Day day : days) {
//            if (day.getDate() == date){
//                UserDayResponse userDayResponse = userDayRepository.findAllByDayId(day.getId());
//                userDayResponse.setStatus(null);
//                userDayRepository.save(userDayResponse);
//            }
    }

}

