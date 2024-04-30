package com.example.iatstages.services.CandidatureService;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    void saveCv(MultipartFile file, Long idCandidature);

    Resource loadCv(Long idCandidature);
}
