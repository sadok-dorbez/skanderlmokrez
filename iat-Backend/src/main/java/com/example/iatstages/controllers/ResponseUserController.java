package com.example.iatstages.controllers;

import com.example.iatstages.entities.ResponseUser;
import com.example.iatstages.services.QuestionService.QuestionService;
import com.example.iatstages.services.ReponseService.ReponseUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/responseUser")
@AllArgsConstructor
public class ResponseUserController {
    private ReponseUserService reponseUserService;
    @Transactional
    @PostMapping("/{questionId}/{userId}")
    public ResponseEntity<ResponseUser> saveResponseUser(@PathVariable Long questionId,@PathVariable Long userId, @RequestBody ResponseUser responseUser) {
        String responseText = responseUser.getResponseText();

        ResponseUser savedResponseUser = reponseUserService.saveResponseUser(questionId, userId, responseText);
        return new ResponseEntity<>(savedResponseUser, HttpStatus.CREATED);
    }

    @GetMapping("/countCorrectByTestId/{testId}")
    public ResponseEntity<Integer> countCorrectResponseUsersByTestId(@PathVariable Long testId) {
        int count = reponseUserService.countCorrectResponseUsersByTestId(testId);
       return new ResponseEntity<>(count, HttpStatus.OK); }

    @GetMapping("/correctPercentageByTestId/{testId}")
    public ResponseEntity<Double> getCorrectResponsePercentageByTestId(@PathVariable Long testId) {
     double percentage = reponseUserService.calculateCorrectResponsePercentageByTestId(testId);
        return new ResponseEntity<>(percentage, HttpStatus.OK);
   }

}
