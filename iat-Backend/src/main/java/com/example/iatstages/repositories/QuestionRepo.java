package com.example.iatstages.repositories;


import com.example.iatstages.entities.Question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepo extends JpaRepository<Question,Long> {
    List<Question> findByTestId(Long testId);
    List<Question> findCorrectAnswersByTestId(Long testId);
}
