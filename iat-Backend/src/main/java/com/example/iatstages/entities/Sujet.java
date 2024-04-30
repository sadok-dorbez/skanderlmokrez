package com.example.iatstages.entities;

import com.example.iatstages.enums.Department;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table (name = "sujets")
public class Sujet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    private String criteres;
    private String technologies;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;
    private Long nombre;

    @Enumerated(EnumType.STRING)
    private Department department;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime creationDate;
    private Boolean isAvailable;


    @OneToMany(mappedBy = "sujet", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Test> tests = new HashSet<>();


    @JsonIgnore
    @OneToMany(mappedBy = "sujet", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Candidature> candidatures = new HashSet<>();


}