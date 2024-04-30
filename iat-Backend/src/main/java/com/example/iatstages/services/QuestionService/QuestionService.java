package com.example.iatstages.services.QuestionService;

import com.example.iatstages.entities.Question;


import java.util.List;

public interface QuestionService {

    List<Question> getAllQuestions();
    List<Question> getQuestionsByTestId(Long testId);
    Question getQuestionById(Long questionId);
    Question createQuestion(Long testId, Question question);

    Question updateQuestion(Long id, Question updatedQuestion);
    void deleteQuestion(Long id);

    List<Question> getCorrectAnswersForTest(Long testId);

    int countQuestionsByTestId(Long testId);
}
