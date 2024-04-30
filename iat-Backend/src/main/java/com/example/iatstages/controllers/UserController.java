package com.example.iatstages.controllers;

import com.example.iatstages.entities.User;
import com.example.iatstages.services.UserService.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private IUserService userService;

    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @PutMapping("/updateUser/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }

    @PostMapping("/activate/{id}")
    public String activateUser(@PathVariable Long id) {
        return userService.activate(id);
    }

    @PostMapping("/saveImage/{idUser}")
    public ResponseEntity<?> saveImage(@RequestParam("file") MultipartFile file, @PathVariable long idUser) {
        userService.saveImage(file, idUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/loadImage/{fileName}")
    public ResponseEntity<Resource> loadImage(@PathVariable String fileName) {
        Resource resource = userService.loadImage(fileName);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
