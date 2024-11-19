package com.camp.Buddy.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarRequest {

    private Integer numberSeason;
    private String startDate;
    private String endDate;
    private String status;
}
