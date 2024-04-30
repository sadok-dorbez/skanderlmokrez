package com.example.iatstages.services.AuthService;

import com.example.iatstages.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.iatstages.enums.ERole;
import com.example.iatstages.entities.Role;
import com.example.iatstages.entities.User;
import com.example.iatstages.repositories.RoleRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
public class AuthService implements IAuthService {
    UserRepository userRepo;
    RoleRepository roleRepo;
    PasswordEncoder encoder;
    private static final long EXPIRE_TOKEN_AFTER_MINUTES = 30;
    @Override
    public Boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }
    @Override
    public Optional<Role> findByName(ERole name) {
        return roleRepo.findByName(name);
    }

    @Override
    public User saveUser(User user) {
        user.setCreationDate(new Date(System.currentTimeMillis()));
        user.setPassword(encoder.encode(user.getPassword()));
        user.setActivated(false);
        return userRepo.save(user); }

    @Override
    public String forgetPassword(String email) {

        Optional<User> userOptional = userRepo.findByEmail(email);

        if (userOptional.isEmpty()) {
            return "Invalid email id.";
        }

        User user = userOptional.get();
        user.setToken(generateToken());
        user.setTokenCreationDate(LocalDateTime.now());

        user = userRepo.save(user);

        return user.getToken();
    }

    @Override
    public String resetPassword(String token, String password) {

        Optional<User> userOptional = userRepo.findByToken(token);

        if (userOptional.isEmpty()) {
            return "Invalid token.";
        }

        LocalDateTime tokenCreationDate = userOptional.get().getTokenCreationDate();

        if (isTokenExpired(tokenCreationDate)) {
            return "Token expired.";

        }

        User user = userOptional.get();
        user.setPassword(encoder.encode(password));
        user.setToken(null);
        user.setTokenCreationDate(null);

        userRepo.save(user);

        return "Your password successfully updated.";
    }
    private String generateToken() {
        StringBuilder token = new StringBuilder();

        return token.append(UUID.randomUUID())
                .append(UUID.randomUUID()).toString();
    }
    private boolean isTokenExpired(LocalDateTime tokenCreationDate) {
        LocalDateTime now = LocalDateTime.now();
        Duration diff = Duration.between(tokenCreationDate, now);

        return diff.toMinutes() >= EXPIRE_TOKEN_AFTER_MINUTES;
    }

}
