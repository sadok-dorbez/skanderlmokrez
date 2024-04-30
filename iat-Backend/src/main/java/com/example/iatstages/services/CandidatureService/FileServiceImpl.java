package com.example.iatstages.services.CandidatureService;

import com.example.iatstages.entities.Candidature;
import com.example.iatstages.repositories.CandidatureRepository;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FileServiceImpl implements FileService{
    private final Path root = Paths.get("src/main/resources/uploads/cv");

    CandidatureRepository candidatureRepository;

//    @Override
//    public void init() {
//        try {
//            Files.createDirectories(root);
//        } catch (IOException e) {
//            throw new RuntimeException("Could not initialize folder for upload!");
//        }
//    }

    @Override
    public void saveCv(MultipartFile file, Long idCandidature) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path filePath = this.root.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            Candidature candidature = candidatureRepository.findById(idCandidature)
                    .orElseThrow(() -> new RuntimeException("Candidature not found"));

            candidature.setCvName(fileName);
            candidatureRepository.save(candidature);

        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource loadCv(Long idCandidature) {
        Candidature candidature = candidatureRepository.findById(idCandidature)
                .orElseThrow(() -> new RuntimeException("Candidature not found"));

        String filename = candidature.getCvName();

        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }


}
