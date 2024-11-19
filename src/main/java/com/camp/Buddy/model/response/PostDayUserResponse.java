package com.camp.Buddy.model.response;

import com.camp.Buddy.model.PostDayUser;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostDayUserResponse {
    private PostDayUser postDayUser;
    private boolean availability;
    private String messagePost;
}
