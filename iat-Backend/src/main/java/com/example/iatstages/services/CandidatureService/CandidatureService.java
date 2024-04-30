package com.example.iatstages.services.CandidatureService;


import com.example.iatstages.entities.Candidature;
import java.util.List;

public interface CandidatureService {
    Candidature addCandidature(Long idUser, Long idSujet, Candidature candidature);
    Candidature getCandidatureById(Long id);

    List<Candidature> getAllCandidatures();

    Candidature updateCandidature(Long idCandidature, Candidature candidature);

    void deleteCandidature(Long id);

    List<Candidature> getCandidaturesBySujet(Long idSujet);

    List<Candidature> getCandidaturesByUser(Long idUser);
}
