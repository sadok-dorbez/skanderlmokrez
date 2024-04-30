package com.example.iatstages.controllers;

import com.example.iatstages.entities.Test;
import com.example.iatstages.services.TestService.*;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/test")
@CrossOrigin("*")
@AllArgsConstructor
public class TestController {

    private TestService testService;

    @GetMapping
    public ResponseEntity<List<Test>> getAllTests() {
        List<Test> tests = testService.getAllTests();
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }

    @GetMapping("/{testId}")
    public ResponseEntity<Test> getTestById(@PathVariable Long testId) {
        Test test = testService.getTestById(testId);
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/getSujet/{sujetId}")
    public ResponseEntity<List<Test>> getTestsBySujetId(@PathVariable Long sujetId) {
        List<Test> tests = testService.getTestsBySujetId(sujetId);
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Test> updateTest(@PathVariable Long id, @RequestBody Test updatedTest) {
        Test result = testService.updateTest(id, updatedTest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTest(@PathVariable Long id) {
        testService.deleteTest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{sujetId}")
    public ResponseEntity<Test> createTest(@PathVariable Long sujetId, @RequestBody Test test) {
        Test createdTest = testService.createTest(sujetId, test);
        return new ResponseEntity<>(createdTest, HttpStatus.CREATED);
    }

}
