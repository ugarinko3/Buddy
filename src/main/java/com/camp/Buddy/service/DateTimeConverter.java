package com.camp.Buddy.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeConverter {

    private LocalDate convertToLocalDate(LocalDateTime localDateTime) {
        return localDateTime.toLocalDate();
    }

    public String formatLocalDateTime(LocalDateTime localDateTime) {
        LocalDate localDate = convertToLocalDate(localDateTime);
        return formatLocalDate(localDate);
    }

    public String formatLocalDate(LocalDate localDate) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return localDate.format(dateFormatter);
    }

}
