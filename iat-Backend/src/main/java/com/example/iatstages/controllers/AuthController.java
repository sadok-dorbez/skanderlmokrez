package com.example.iatstages.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.iatstages.enums.ERole;
import com.example.iatstages.entities.Role;
import com.example.iatstages.entities.User;
import com.example.iatstages.dtos.requests.*;
import com.example.iatstages.dtos.responses.JwtResponse;
import com.example.iatstages.dtos.responses.MessageResponse;
import com.example.iatstages.repositories.UserRepository;
import com.example.iatstages.security.jwt.JwtUtils;
import com.example.iatstages.security.services.UserDetailsImpl;
import com.example.iatstages.services.AuthService.IAuthService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final IAuthService authService;
  private final PasswordEncoder encoder;
  private final JwtUtils jwtUtils;
  private final UserRepository userRepo;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    User user = userRepo.findById(userDetails.getId()).orElse(null);
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User not found!"));
    }

    if (!user.getActivated()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Your account is deactivated!"));
    }

    String jwt = jwtUtils.generateJwtToken(userDetails);

    List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(),
            userDetails.getUsername(), userDetails.getEmail(), roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (authService.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (authService.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()));

    String  role = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (role == null) {
      Role defaultRole = authService.findByName(ERole.ROLE_CANDIDAT)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(defaultRole);
    } else {
      switch (role) {
        case "ROLE_ADMIN":
          Role adminRole = authService.findByName(ERole.ROLE_ADMIN)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);
          break;
        case "ROLE_RECRUTEUR":
          Role recRole = authService.findByName(ERole.ROLE_RECRUTEUR)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(recRole);
          break;
        case "ROLE_CANDIDAT":
          Role conRole = authService.findByName(ERole.ROLE_CANDIDAT)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(conRole);
          break;
        default:
          Role defaultRole = authService.findByName(ERole.ROLE_CANDIDAT)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(defaultRole);
          break;
      }
    }
    user.setRoles(roles);
    authService.saveUser(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    return ResponseEntity.ok(new MessageResponse("Log out successful!"));
  }

  @PostMapping("/forgetpassword")
  public ResponseEntity<?> forgetPassword(@RequestBody ForgetPassword fp) {
    return ResponseEntity.ok(new MessageResponse(authService.forgetPassword(fp.getEmail())));
  }

  @PutMapping("/resetpassword")
  public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest rpr) {
    return ResponseEntity.ok(new MessageResponse(authService.resetPassword(rpr.getToken(), rpr.getPassword())));
  }
}
