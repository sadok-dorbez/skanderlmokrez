package com.example.iatstages.services.SujetService;

import com.example.iatstages.entities.Sujet;
import java.io.IOException;
import java.util.List;

public interface SujetService {
    Sujet addSujet(Sujet sujet);

    Sujet getSujetById(Long id);

    List<Sujet> getAllSujets();

    Sujet updateSujet(Long sujetId, Sujet sujet);

    void deleteSujet(Long id);

}
