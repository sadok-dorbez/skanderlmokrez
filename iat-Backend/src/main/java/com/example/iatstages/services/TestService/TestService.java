package com.example.iatstages.services.TestService;

import com.example.iatstages.entities.Test;


import java.util.List;

public interface TestService {
    List<Test> getAllTests();

    List<Test> getTestsBySujetId(Long sujetId);

    Test getTestById(Long testId);

    Test createTest(Long sujetId, Test test);

    Test updateTest(Long id, Test updatedTest);

    void deleteTest(Long id);
}
