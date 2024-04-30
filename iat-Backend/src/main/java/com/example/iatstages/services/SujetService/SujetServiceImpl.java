package com.example.iatstages.services.SujetService;

import com.example.iatstages.entities.Sujet;
import com.example.iatstages.repositories.SujetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class SujetServiceImpl implements SujetService {
    private final SujetRepository sujetRepository;

    @Override
    public Sujet addSujet(Sujet sujet) {
        sujet.setCreationDate(LocalDateTime.now());
        sujet.setIsAvailable(true);
        return sujetRepository.save(sujet);
    }
    @Override
    public Sujet getSujetById(Long id) {
    return sujetRepository.findById(id).orElseThrow(() -> new RuntimeException("Sujet not found"));
    }
    @Override
    public List<Sujet> getAllSujets() {
        return sujetRepository.findAll();
    }

    @Override
    public Sujet updateSujet(Long idSujet, Sujet sujet) {
            Sujet existingSujet = getSujetById(idSujet);

            existingSujet.setTitle(sujet.getTitle());
            existingSujet.setCriteres(sujet.getCriteres());
            existingSujet.setDescription(sujet.getDescription());
            existingSujet.setTechnologies(sujet.getTechnologies());
            existingSujet.setStartDate(sujet.getStartDate());
            existingSujet.setEndDate(sujet.getEndDate());
            existingSujet.setDepartment(sujet.getDepartment());
            existingSujet.setNombre(sujet.getNombre());
            existingSujet.setIsAvailable(sujet.getIsAvailable());


            return sujetRepository.save(existingSujet);
    }

    @Override
    public void deleteSujet(Long id) {
        sujetRepository.deleteById(id);
    }
}
