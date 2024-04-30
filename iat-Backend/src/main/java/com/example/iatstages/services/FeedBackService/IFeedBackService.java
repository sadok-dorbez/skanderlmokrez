package com.example.iatstages.services.FeedBackService;

import com.example.iatstages.entities.FeedBack;
import java.util.List;

public interface IFeedBackService {
    FeedBack createFeedback(Long userId, FeedBack feedBack);
    List<FeedBack> getAllFeedbacks();
    FeedBack getFeedbackById(Long id);
    void deleteFeedback(Long id);
}
