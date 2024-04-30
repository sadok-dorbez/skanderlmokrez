package com.example.iatstages.repositories;

import com.example.iatstages.entities.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepo extends JpaRepository<Test,Long> {
    List<Test> findBySujetId(Long sujetId);
}
