package com.example.iatstages.services.TestService;


import com.example.iatstages.entities.Sujet;
import com.example.iatstages.entities.Test;
import com.example.iatstages.repositories.SujetRepository;
import com.example.iatstages.repositories.TestRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class TestServiceImpl implements TestService {

    private TestRepo testRepo;
    private SujetRepository sujetRepo;


    @Override
    public List<Test> getAllTests() {
        return testRepo.findAll();
    }

    @Override
    public List<Test> getTestsBySujetId(Long sujetId) {
        return testRepo.findBySujetId(sujetId);
    }


    @Override
    public Test getTestById(Long testId) {
        return testRepo.findById(testId)
                .orElseThrow(() -> new EntityNotFoundException("Test not found with id: " + testId));
    }

    public Test createTest(Long sujetId, Test test) {
        Sujet sujet = sujetRepo.findById(sujetId)
                .orElseThrow(() -> new EntityNotFoundException("Sujet not found with id: " + sujetId));

        sujet.getTests().add(test);
        test.setSujet(sujet);
        return testRepo.save(test);
    }
    @Override
    public Test updateTest(Long id, Test updatedTest) {
        Test test = testRepo.findById(id).orElseThrow();
        test.setTitle(updatedTest.getTitle());

        test.setDescription(updatedTest.getDescription());
        test.setDuration(updatedTest.getDuration());

        return testRepo.save(test);
    }

    @Override
    public void deleteTest(Long id) {
        testRepo.deleteById(id);
    }
}
