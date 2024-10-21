package com.camp.Buddy.model.Response;

import com.camp.Buddy.model.PostDayUser;
import com.camp.Buddy.model.Team;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class PostDayUserResponse {
    private PostDayUser postDayUser;
    private boolean availability;
    private String messagePost;
}
