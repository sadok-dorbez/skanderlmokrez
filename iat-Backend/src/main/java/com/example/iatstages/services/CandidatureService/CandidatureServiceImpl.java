package com.example.iatstages.services.CandidatureService;

import com.example.iatstages.entities.Candidature;
import com.example.iatstages.entities.Sujet;
import com.example.iatstages.entities.User;
import com.example.iatstages.enums.StatutCandidature;
import com.example.iatstages.repositories.CandidatureRepository;
import com.example.iatstages.repositories.SujetRepository;
import com.example.iatstages.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class CandidatureServiceImpl implements CandidatureService{

    CandidatureRepository candidatureRepository;
    UserRepository userRepository;
    SujetRepository sujetRepository;
    @Override
    public Candidature addCandidature(Long idUser, Long idSujet, Candidature candidature) {
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Sujet sujet = sujetRepository.findById(idSujet)
                .orElseThrow(() -> new RuntimeException("Sujet not found"));

        candidature.setUser(user);
        candidature.setSujet(sujet);
        candidature.setCreationDate(LocalDateTime.now());
        candidature.setStatut(StatutCandidature.NEW);

        return candidatureRepository.save(candidature);
    }
    @Override
    public Candidature getCandidatureById(Long id) {
        return candidatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidature not found"));
    }

    @Override
    public List<Candidature> getAllCandidatures() {
        return candidatureRepository.findAll();
    }

    @Override
    public Candidature updateCandidature(Long idCandidature, Candidature candidature)  {
        Candidature existingCandidature = getCandidatureById(idCandidature);

        existingCandidature.setStatut(candidature.getStatut());
        existingCandidature.setLettreMotivation(candidature.getLettreMotivation());
        existingCandidature.setCvName(candidature.getCvName());
        existingCandidature.setUser(candidature.getUser());
        existingCandidature.setSujet(candidature.getSujet());

        return candidatureRepository.save(existingCandidature);
    }

    @Override
    public void deleteCandidature(Long id) {
        candidatureRepository.deleteById(id);
    }

    @Override
    public List<Candidature> getCandidaturesBySujet(Long idSujet) {
        return candidatureRepository.findBySujetId(idSujet);
    }

    @Override
    public List<Candidature> getCandidaturesByUser(Long idUser) {
        return candidatureRepository.findByUserId(idUser);
    }
}
