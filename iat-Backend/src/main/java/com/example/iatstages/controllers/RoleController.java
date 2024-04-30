package com.example.iatstages.controllers;

import com.example.iatstages.entities.Role;
import com.example.iatstages.repositories.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@AllArgsConstructor
@RequestMapping("/api/role")
public class RoleController {
    RoleRepository roleRepo;

    @GetMapping("/getRoles")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleRepo.findAll();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @PostMapping("/newRole")
    public ResponseEntity<Role> newRole(@RequestBody Role role) {
        Role newRole = roleRepo.save(role);
        return new ResponseEntity<>(newRole, HttpStatus.CREATED);
    }

}
