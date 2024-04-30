package com.example.iatstages.services.FeedBackService;

import com.example.iatstages.entities.FeedBack;
import com.example.iatstages.entities.User;
import com.example.iatstages.repositories.FeedBackRepository;
import com.example.iatstages.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedBackService implements IFeedBackService{

    @Autowired
    private FeedBackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public FeedBack createFeedback(Long userId, FeedBack feedBack) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        feedBack.setUser(user);
        feedBack.setTimestamp(LocalDateTime.now());

        return feedbackRepository.save(feedBack);
    }


    public List<FeedBack> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public FeedBack getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
    }

    public void deleteFeedback(Long id) {
        if (!feedbackRepository.existsById(id)) {
            throw new RuntimeException("Feedback not found with id: " + id);
        }
        feedbackRepository.deleteById(id);
    }
}
