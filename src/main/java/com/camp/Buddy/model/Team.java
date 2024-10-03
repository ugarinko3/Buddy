package com.camp.Buddy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@Entity // Убедитесь, что эта аннотация присутствует
@Table(name = "team") // Опционально, если хотите задать имя таблицы
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "curator_id") // Убедитесь, что имя колонки соответствует вашей базе данных
    private User curator;

    @OneToMany
    private List<User> participants;
}
