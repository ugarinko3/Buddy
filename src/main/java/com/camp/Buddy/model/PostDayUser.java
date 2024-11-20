package com.camp.Buddy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "post_day_user")
public class PostDayUser extends Post {

    @Column(name = "id_day")
    private UUID idDay;

    @Column(name = "role")
    private String role;

    @ManyToOne
    @JoinColumn(name = "curator")
    private User curator;

    @Column(name = "status")
    private String status;
}