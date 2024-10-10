package com.camp.Buddy.model.Response;

import com.camp.Buddy.model.Goal;
import com.camp.Buddy.model.Team;
import com.camp.Buddy.model.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserResponse {

    private User user;
    private List<Team> team;
    private List<Goal> goals;
    private List<DayProfileResponse> days;
}
