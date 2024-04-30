package com.example.iatstages.repositories;

import com.example.iatstages.entities.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature> findBySujetId(Long idSujet);

    List<Candidature> findByUserId(Long idUser);
}
