package com.example.iatstages.services.UserService;

import com.example.iatstages.entities.User;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();

    User getUser(Long id);

    String updateUser(Long id, User _user);

    String deleteUser(Long id);

    String activate(Long id);

    void saveImage(MultipartFile file, long idUser);

    Resource loadImage(String fileName);
}
