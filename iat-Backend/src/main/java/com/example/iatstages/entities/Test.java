package com.example.iatstages.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Test")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Basic
    @Column(name = "Title")
    private String Title ;

    @Basic
    @Column(name = "Description")
    private String  Description ;

    @Basic
    @Column(name = "Duration")
    private int Duration ;

    @ManyToOne
    @JoinColumn(name = "sujet", referencedColumnName = "id")
    @JsonBackReference
    private Sujet sujet;

    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Question> questions = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
