package com.example.iatstages.services.ReponseService;
import com.example.iatstages.entities.Question;
import com.example.iatstages.entities.Response;
import com.example.iatstages.entities.ResponseUser;


import java.util.List;

public interface ReponseUserService {

    ResponseUser saveResponseUser(Long questionId, Long userId, String responseText);

    List<ResponseUser> getCorrectResponseUsersByTestId(Long testId);

    double calculateCorrectResponsePercentageByTestId(Long testId);

    int countCorrectResponseUsersByTestId(Long testId);
}
