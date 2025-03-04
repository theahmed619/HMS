package com.hms.controller;

import com.hms.entity.Appointment;
import com.hms.entity.User;
import com.hms.service.AppointmentService;
import com.hms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AppointmentService appointmentService;

    // User Registration
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        boolean isRegistered = userService.registerUser(user);
        if (isRegistered) {
            return ResponseEntity.ok("User registered successfully!");
        } else {
            return ResponseEntity.badRequest().body("Registration failed!");
        }
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user, HttpSession session) {
        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (loggedInUser != null) {
            session.setAttribute("userObj", loggedInUser);
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password!");
        }
    }

    // User Logout
    @GetMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.removeAttribute("userObj");
        return ResponseEntity.ok("User logged out successfully!");
    }

    // Change Password
    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestParam int userId, @RequestParam String oldPassword, @RequestParam String newPassword) {
        boolean isOldPasswordCorrect = userService.checkOldPassword(userId, oldPassword);
        if (!isOldPasswordCorrect) {
            return ResponseEntity.badRequest().body("Old password is incorrect!");
        }
        boolean isChanged = userService.changePassword(userId, newPassword);
        if (isChanged) {
            return ResponseEntity.ok("Password changed successfully!");
        } else {
            return ResponseEntity.badRequest().body("Failed to change password!");
        }
    }

  
}
