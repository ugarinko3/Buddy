package com.camp.Buddy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "curator_id")
    private User curator;

    @OneToMany
    private Set<User> participants;
}
