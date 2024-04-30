package com.example.iatstages.repositories;

import com.example.iatstages.entities.Response;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponseRepo extends JpaRepository<Response,Long> {
    List<Response> findByQuestionId(Long questionId);

}



