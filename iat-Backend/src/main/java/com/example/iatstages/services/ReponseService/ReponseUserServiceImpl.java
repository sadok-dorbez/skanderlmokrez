package com.example.iatstages.services.ReponseService;

import com.example.iatstages.entities.Question;
import com.example.iatstages.entities.ResponseUser;
import com.example.iatstages.entities.User;
import com.example.iatstages.services.QuestionService.QuestionServiceImpl;
import com.example.iatstages.repositories.ResponseUserRepo;

import com.example.iatstages.services.UserService.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReponseUserServiceImpl implements ReponseUserService{

    private ResponseUserRepo responseUserRepo;
    private QuestionServiceImpl QuestionServiceImpl;
    private UserService userService;

    @Override
    public ResponseUser saveResponseUser(Long questionId, Long userId, String responseText) {
        Question question = QuestionServiceImpl.getQuestionById(questionId);
        User user = userService.getUser(userId);
        ResponseUser responseUser = new ResponseUser();
        responseUser.setQuestion(question);
        responseUser.setUser(user);
        responseUser.setResponseText(responseText);

        responseUser.setCorrect(false);

        if (question.getResponseCorrect().equals(responseText)) {
            responseUser.setCorrect(true);
        }

        return responseUserRepo.save(responseUser);
    }
    @Override
    public int countCorrectResponseUsersByTestId(Long testId) {
        List<ResponseUser> correctResponseUsers = getCorrectResponseUsersByTestId(testId);
        return correctResponseUsers.size();
    }

    @Override
    public List<ResponseUser> getCorrectResponseUsersByTestId(Long testId) {
        return responseUserRepo.findCorrectResponseUsersByTestId(testId);
    }
    @Override
    public double calculateCorrectResponsePercentageByTestId(Long testId) {
        int totalQuestions = QuestionServiceImpl.countQuestionsByTestId(testId);
        int correctResponses = countCorrectResponseUsersByTestId(testId);
        return (double) correctResponses / totalQuestions * 100;
    }


}
