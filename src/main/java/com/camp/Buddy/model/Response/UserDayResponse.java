package com.camp.Buddy.model.Response;

import com.camp.Buddy.model.Day;
import com.camp.Buddy.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_days")
public class UserDayResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;



    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "day_id")
    private Day day;

    @Column(name = "status")
    private String status;


}
