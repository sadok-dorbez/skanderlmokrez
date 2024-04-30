package com.example.iatstages.services.ReponseService;

import com.example.iatstages.entities.Question;
import com.example.iatstages.entities.Response;
import com.example.iatstages.repositories.QuestionRepo;
import com.example.iatstages.repositories.ResponseRepo;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReponseServiceImpl implements ReponseService {

    private ResponseRepo responseRepo;
    private QuestionRepo questionRepo;

    @Override
    public List<Response> getAllResponses() {
        return responseRepo.findAll();
    }

    @Override
    public List<Response> getResponsesByQuestionId(Long questionId) {
        return responseRepo.findByQuestionId(questionId);
    }

    @Override
    public Response getResponseById(Long responseId) {
        return responseRepo.findById(responseId)
                .orElseThrow(() -> new EntityNotFoundException("Answer not found with id: " + responseId));
    }

    @Override
    public Response createResponse(Long questionId, Response response) {
        Question question = questionRepo.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

        question.getResponses().add(response);
        response.setQuestion(question);
        return responseRepo.save(response);
    }

    public void updateCorrectResponseForQuestion(Long responseId) {
        Response response = responseRepo.findById(responseId)
                .orElseThrow(() -> new EntityNotFoundException("Response not found with id: " + responseId));

        if (response.getIsCorrect().equals(true)) {
            Question question = response.getQuestion();
            question.setResponseCorrect(response.getResponseText());
            questionRepo.save(question);
        }
    }

    @Override
    public Response updateResponse(Long id, Response updatedResponse) {
        Response response = responseRepo.findById(id).orElseThrow();
        response.setResponseText(updatedResponse.getResponseText());
        return responseRepo.save(response);
    }

    @Override
    public void deleteResponse(Long id) {
        responseRepo.deleteById(id);
    }



}
