package com.camp.Buddy.model.response;

import com.camp.Buddy.model.PostNews;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostResponse {

    private PostNews postNews;
    private boolean liked;
}
