package com.example.iatstages.services.ReponseService;
import com.example.iatstages.entities.Response;


import java.util.List;

public interface ReponseService {

    List<Response> getAllResponses();

    List<Response> getResponsesByQuestionId(Long questionId);

    Response getResponseById(Long responseId);

    Response createResponse(Long questionId, Response response);

    Response updateResponse(Long id, Response updatedResponse);

    void deleteResponse(Long id);


}
