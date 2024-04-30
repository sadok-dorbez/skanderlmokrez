package com.example.iatstages.controllers;

import com.example.iatstages.entities.FeedBack;
import com.example.iatstages.services.FeedBackService.IFeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;




@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/feedbacks")
public class FeedBackController {
    @Autowired
    private IFeedBackService feedBackService;

    @PostMapping("/{userId}")
    public ResponseEntity<FeedBack> createFeedback(@PathVariable Long userId, @RequestBody FeedBack feedBack) {
        FeedBack createdFeedback = feedBackService.createFeedback(userId, feedBack);
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FeedBack>> getAllFeedbacks() {
        List<FeedBack> feedbacks = feedBackService.getAllFeedbacks();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedBack> getFeedbackById(@PathVariable Long id) {
        FeedBack feedback = feedBackService.getFeedbackById(id);
        if (feedback == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        try {
            feedBackService.deleteFeedback(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
