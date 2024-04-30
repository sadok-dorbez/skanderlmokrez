package com.example.iatstages.repositories;

import com.example.iatstages.entities.Question;
import com.example.iatstages.entities.ResponseUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ResponseUserRepo extends JpaRepository<ResponseUser, Long> {

    List<ResponseUser> findByQuestion(Question question);

    @Query("SELECT ru FROM ResponseUser ru JOIN ru.question q WHERE q.test.id = :testId AND ru.correct = true")
    List<ResponseUser> findCorrectResponseUsersByTestId(@Param("testId") Long testId);


}
