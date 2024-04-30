package com.example.iatstages.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Response")
public class Response {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long responseId ;
    @Basic
    @Column(name = "Response")
    private String responseText ;
    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    @JsonBackReference
    private Question question;
    @Column(name = "is_Correct")
    private Boolean isCorrect;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
