package com.example.iatstages.controllers;

import com.example.iatstages.entities.Sujet;
import com.example.iatstages.services.SujetService.SujetService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/sujet")
@AllArgsConstructor
public class SujetController {
    private final SujetService sujetService;

    //Admin
    @GetMapping("/getAllSujets")
    public ResponseEntity<?> getAllSujets() {
        return ResponseEntity.ok(sujetService.getAllSujets());
    }
    @PostMapping("/addSujet")
    public ResponseEntity<?> addSujet(@RequestBody Sujet sujet) {
        return ResponseEntity.ok(sujetService.addSujet(sujet));
    }
    @GetMapping("/getSujetById/{id}")
    public ResponseEntity<Sujet> getSujetById(@PathVariable Long id){
        return ResponseEntity.ok(sujetService.getSujetById(id));
    }

    @PutMapping("/updateSujet/{idSujet}")
    public ResponseEntity<?> updateSujet(@PathVariable Long idSujet, @RequestBody Sujet sujet) {
        return ResponseEntity.ok(sujetService.updateSujet(idSujet, sujet));
    }
    @DeleteMapping("/deleteSujet/{id}")
    public ResponseEntity<?> deleteSujet (@PathVariable Long id){
        sujetService.deleteSujet(id);
        return  ResponseEntity.ok(HttpStatus.OK);
    }

    //Candidat


}
