package com.camp.Buddy.service;

import com.camp.Buddy.model.*;
import com.camp.Buddy.model.response.UserDayResponse;
import com.camp.Buddy.repository.*;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
public class ExcelServise {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final FirebaseStorageService firebaseStorageService;
    private final TeamRepository teamRepository;
    private final CalendarRepository calendarRepository;
    private final UserDayRepository userDayRepository;


    public void exportDataToExcel(Season season) {
        List<User> users = userRepository.findAll();
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Users");
        exportMeeting(workbook);
        exportBuddyCalendar(workbook, season);
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Name");
        header.createCell(1).setCellValue("Role");
        header.createCell(2).setCellValue("Xp");

        int rowNum = 1;
        for (User user : users) {
            header = sheet.createRow(rowNum++);
            header.createCell(0).setCellValue(user.getLogin());
            header.createCell(1).setCellValue(user.getRole());
            header.createCell(2).setCellValue(user.getXp());
        }

        try {
            String fileName = "season" + season.getNumberSeason() + ".xlsx";
            firebaseStorageService.uploadExcel(workbook, fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void exportMeeting(Workbook workbook) {

        Sheet sheet = workbook.createSheet("Meeting");
        int rowNum = 0;

        Row row = sheet.createRow(rowNum);
        row.createCell(0).setCellValue("Campus");
        row.createCell(1).setCellValue("Team");
        row.createCell(2).setCellValue("Curator");


        List<Long> sizePosts = postRepository.findAllPostCountsByLogin();

        for (int i = 0, column = 3; i < sizePosts.get(0); i++, column++) {
            row.createCell(column).setCellValue(i + 1);
        }

        List<Team> teams = teamRepository.findAll();

        for (Team team : teams) {
            row = sheet.createRow(rowNum++ + 1);
            row.createCell(0).setCellValue(userRepository.findByLogin(team.getCurator().getLogin()).getCoreProgramm());
            row.createCell(1).setCellValue(team.getName());
            row.createCell(2).setCellValue(team.getCurator().getLogin());
            List<PostNews> posts = postRepository.findByLogin(team.getCurator().getLogin());

            for (int t = 3; t < posts.size() + 3; t++) {
                DateTimeConverter converter = new DateTimeConverter();
                row.createCell(t).setCellValue(converter.formatLocalDateTime(posts.get(t - 3).getDate()));

            }
        }
    }

    private void exportBuddyCalendar(Workbook workbook, Season season) {
        Sheet sheet = workbook.createSheet("Buddy Calendar");
        DateTimeConverter converter = new DateTimeConverter();
        int rowNum = 0;
        Row row = sheet.createRow(rowNum);
        row.createCell(0).setCellValue("Name");
        row.createCell(1).setCellValue("Telegram");
        row.createCell(2).setCellValue("Nickname");
        row.createCell(3).setCellValue("Bottom line");

        List<Day> days = calendarRepository.findAllByOrderByDateAsc();
        int rowDay = 4;
        for (Day day : days) {
            row.createCell(rowDay++).setCellValue(converter.formatLocalDate(day.getDate()));

        }
        List<User> users = userRepository.findAllBySeasons(season);
        int rowNumUser = 1;
        for (User user : users) {
            row = sheet.createRow(rowNumUser++);
            row.createCell(0).setCellValue(user.getName());
            row.createCell(1).setCellValue(user.getTelegram());
            row.createCell(2).setCellValue(user.getLogin());
            row.createCell(3).setCellValue(String.valueOf(user.getToken()));

            List<UserDayResponse> daysUser = userDayRepository.findAllByUserIdSortedByDate(user.getId());

            int rowDayUser = 4;
            for (UserDayResponse day : daysUser) {
                row.createCell(rowDayUser++).setCellValue(day.getStatus());
            }

        }
    }
}
