package com.camp.Buddy.model.Response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class DayProfileResponse {
    private LocalDate date;
    private String status;
}
