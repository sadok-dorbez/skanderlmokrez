package com.example.iatstages.controllers;


import com.example.iatstages.services.QuestionService.*;
import com.example.iatstages.entities.Question;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")
@CrossOrigin("*")
@AllArgsConstructor
public class QuestionController {

    private QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/getTest/{testId}")
    public ResponseEntity<List<Question>> getQuestionsByTestId(@PathVariable Long testId) {
        List<Question> questions = questionService.getQuestionsByTestId(testId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long questionId) {
        Question question = questionService.getQuestionById(questionId);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

     @PostMapping("/{testId}")
    public ResponseEntity<Question> createQuestion(@PathVariable Long testId, @RequestBody Question question) {
        Question createdQuestion = questionService.createQuestion(testId, question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        Question result = questionService.updateQuestion(id, updatedQuestion);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTest(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/countByTestId/{testId}")
    public ResponseEntity<Integer> countQuestionsByTestId(@PathVariable Long testId) {
        int count = questionService.countQuestionsByTestId(testId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

}
