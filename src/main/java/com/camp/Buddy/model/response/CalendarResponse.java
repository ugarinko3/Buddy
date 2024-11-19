package com.camp.Buddy.model.response;

import com.camp.Buddy.model.Day;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CalendarResponse {

    private Day day;
    private String status;
}
