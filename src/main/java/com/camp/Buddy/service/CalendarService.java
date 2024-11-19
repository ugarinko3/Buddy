package com.camp.Buddy.service;

import com.camp.Buddy.model.*;

import com.camp.Buddy.model.response.CalendarResponse;
import com.camp.Buddy.model.response.PostDayUserResponse;
import com.camp.Buddy.model.response.UserDayResponse;
import com.camp.Buddy.repository.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@AllArgsConstructor
@Service
public class CalendarService {

    private final FirebaseStorageService firebaseStorageService;
    private final CalendarRepository calendarRepository;
    private final CalendarDayRepository calendarDayRepository;
    private final UserDayRepository userDayRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final TeamService teamService;
    private final SeasonService seasonService;
    private final AdminService adminService;


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
                CalendarResponse calendarResponse = new CalendarResponse();
                calendarResponse.setDay(day);
                calendarResponse.setStatus(userDayResponseOptional.map(UserDayResponse::getStatus).orElse("no-active"));
                calendarResponses.add(calendarResponse);
            }
            return calendarResponses;
        }
        return null;
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
        Team team = teamService.getTeamsByParticipantId(user.getId()).get(0);
        changeDayCalendar(user.getId(), post.getIdDay(), "Process");
        post.setUrlPostImage(imageUrlPost);
        post.setUrlAvatar(userService.getAvatarUrlByLogin(post.getLogin()));
        post.setCurator(team.getCurator());
        post.setTeamName(team.getName());
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
    public ResponseEntity<?> failPostUser(PostDayUser postDayUser) throws Exception{
        User user = examinationUser(postDayUser.getLogin());
        changeDayCalendar(user.getId(), postDayUser.getIdDay(), "Fail");
        postDayUser.setStatus("Fail");
        calendarDayRepository.save(postDayUser);
        return ResponseEntity.ok().build();
    }
    public ResponseEntity<?> successPostUser(PostDayUser postDayUser) throws Exception {
        User user = examinationUser(postDayUser.getLogin());
        User curator = examinationUser(postDayUser.getCurator().getLogin());
        try {
            userService.createToken(user, curator);
            changeDayCalendar(user.getId(), postDayUser.getIdDay(), "Success");
            postDayUser.setStatus("Success");
            calendarDayRepository.save(postDayUser);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
    }

    public User examinationUser(String login) throws Exception {
        Optional<User> userOpt = userRepository.findByLogin(login);
        if (userOpt.isPresent()) {
            return userOpt.get();
        }
        throw new UserPrincipalNotFoundException("User with login " + login + " not found.");
    }

    public void changeDayCalendar(UUID idUser, UUID idDay, String status) {
        UserDayResponse dayUserCalendar = userDayRepository.findByUserIdAndDayId(idUser, idDay);
        dayUserCalendar.setStatus(status);
        userDayRepository.save(dayUserCalendar);
    }

    public ResponseEntity<?> selectStatus(PostDayUser postDayUser) throws Exception {
        if ("successes".equals(postDayUser.getStatus())) {
            return successPostUser(postDayUser);
        } else {
            return failPostUser(postDayUser);
        }
    }

    @Scheduled(cron = "0 59 17 * * ?")
    public void triggerSelectDay() {
        List<Day> days = calendarRepository.findAllByOrderByDateAsc();
        LocalDate today = LocalDate.now();

        if (!days.isEmpty()) {
            LocalDate firstDay = days.get(0).getDate();
            LocalDate lastDay = days.get(days.size() - 1).getDate();
            LocalDate nextDay = lastDay.plusDays(1);
            if (today.equals(firstDay)) {
                seasonService.setStatusSeason(seasonService.REGISTRATION, seasonService.ACTION);

            } else if (today.equals(nextDay)) {
                seasonService.setStatusSeason(seasonService.ACTION, seasonService.CLOSE);

            }
        }

        for (Day day : days) {
            if (today.equals(day.getDate())) {
                selectDay(day);
            }
        }


    }

    public void selectDay(Day day) {
        if ("no-active".equals(day.getStatus())) {
            day.setStatus("active");
            calendarRepository.save(day);

            List<UserDayResponse> userDayResponseList = userDayRepository.findAllByDayId(day.getId());
            for (UserDayResponse userDayResponse : userDayResponseList) {
                userDayResponse.setStatus("active");
                userDayRepository.save(userDayResponse);
            }
        }
    }
}


