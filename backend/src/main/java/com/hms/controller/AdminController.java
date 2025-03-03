package com.hms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class AdminController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if ("admin@gmail.com".equals(email) && "admin".equals(password)) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(401).body("Invalid Credentials");
        }
    }
}
