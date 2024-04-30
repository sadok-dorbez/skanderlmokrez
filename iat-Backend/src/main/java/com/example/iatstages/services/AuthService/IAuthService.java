package com.example.iatstages.services.AuthService;



import com.example.iatstages.enums.ERole;
import com.example.iatstages.entities.Role;
import com.example.iatstages.entities.User;
import java.util.Optional;

public interface IAuthService {
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<Role> findByName(ERole name);

    User saveUser(User user);

    String forgetPassword(String email);

    String resetPassword(String token, String password);
}
