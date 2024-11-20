package com.camp.Buddy.service;

import com.camp.Buddy.model.Day;
import com.camp.Buddy.model.Season;
import com.camp.Buddy.model.User;
import com.camp.Buddy.repository.CalendarRepository;
import com.camp.Buddy.repository.SeasonRepository;
import com.camp.Buddy.repository.UserDayRepository;
import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SeasonService {
    final private SeasonRepository seasonRepository;
    private final CalendarRepository calendarRepository;
    private final UserRepository userRepository;
    private final ExcelServise excelServise;
    private final UserService userService;
    private final UserDayRepository userDayRepository;

    public final String CLOSE = "Closed";
    public final String ACTION = "Action";
    public final String REGISTRATION = "Registration";
    private final AdminService adminService;
    private final CleaningService cleaningService;


    public ResponseEntity<?> createSeason(Season season) {
        try {
            season.setStatus(REGISTRATION);
            seasonRepository.save(season);
            boolean isCalendarCreated = createCalendar(season);
            return isCalendarCreated ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public boolean createCalendar(Season season) {
        List<Day> days = calendarRepository.findAll();
        if (days.isEmpty()) {
            userDayRepository.deleteAll();
            calendarRepository.deleteAll();

        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate startDate = LocalDate.parse(season.getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(season.getEndDate(), formatter);

        List<Day> calendarEntities = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            Day day = new Day();
            day.setDate(date);
            day.setStatus("no-active");
            calendarEntities.add(day);
        }

        calendarRepository.saveAll(calendarEntities);

        List<User> users = userRepository.findAllByRole(userService.ADMIN);


        for (User user : users) {
            userService.createCalendarUser(user, calendarEntities);
        }

        return true;
    }

//    public ResponseEntity<?> addUserDay(User user, List<Day> days) {
//
//    }

    public ResponseEntity<?> registrationUser(String login) {
        try {
            User user = userRepository.findByLogin(login);
            Season seasons = seasonRepository.findByStatus(REGISTRATION);
            user.getSeasons().add(seasons);
            userRepository.save(user);
            userService.createCalendar(user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public void setStatusSeason(String status, String currentStatus) {

        Season season = seasonRepository.findByStatus(status);
        if (status.equals(ACTION)) {
            excelServise.exportDataToExcel(season);
            cleaningService.cleaningDataBase();

        } else {
            adminService.generationCommand(season);
        }
        season.setStatus(currentStatus);
        seasonRepository.save(season);
    }

    public ResponseEntity<Season> getSeasonUser(String login) {
        try {
            Season season = seasonRepository.findByStatus(REGISTRATION);
            User user = userRepository.findByLogin(login);


            if (season == null) {
                season = seasonRepository.findByStatus(ACTION);
            }


            // Проверяем, есть ли у пользователя этот сезон
            if (user.getSeasons().contains(season)) {
                return ResponseEntity.ok(season); // Возвращаем сезон, если он есть
            } else {
                return ResponseEntity.ok(null); // Возвращаем сообщение, если сезона нет
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // Возвращаем сообщение об ошибке
        }
    }


    public ResponseEntity<Season> getSeason() {
        try {
            Season season = seasonRepository.findByStatus(REGISTRATION);
            if (season != null) {
                return ResponseEntity.ok(season);
            } else {
                return ResponseEntity.ok(null); // Возвращаем 404 без тела
            }
        } catch (Exception e) {
//            e.printStackTrace();
            return ResponseEntity.badRequest().body(null); // Возвращаем 400 с пустым телом
        }
    }


//    public void closeSeason() {
//        Season season = seasonRepository.findByStatus("Action");
//        season.setStatus("Closed");
//        seasonRepository.save(season);
//    }
//    public

}
