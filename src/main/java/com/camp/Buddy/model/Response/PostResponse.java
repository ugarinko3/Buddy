package com.camp.Buddy.model.Response;

import com.camp.Buddy.model.Post;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostResponse {

    private Post post;
    private boolean liked;
}
