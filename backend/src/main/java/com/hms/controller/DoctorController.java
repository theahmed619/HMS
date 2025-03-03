package com.hms.controller;

import com.hms.entity.Doctor;
import com.hms.service.AppointmentService;
import com.hms.service.DoctorService;

import jakarta.servlet.http.HttpSession;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend connection
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/add")
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor) {
        Doctor savedDoctor = doctorService.registerDoctor(doctor);
        return ResponseEntity.ok(savedDoctor);
    }

    // Doctor Login
   @PostMapping("/login")
public ResponseEntity<?> loginDoctor(@RequestBody Map<String, String> credentials) {
    if (credentials == null || !credentials.containsKey("email") || !credentials.containsKey("password")) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Email and password are required."));
    }

    String email = credentials.get("email");
    String password = credentials.get("password");

    Optional<Doctor> doctor = doctorService.loginDoctor(email, password);

    if (doctor.isPresent()) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("doctor", doctor.get()); // Send doctor details if needed
        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("error", "Invalid email or password"));
    }
}

      @GetMapping("/logout")
    public ResponseEntity<?> doctorLogout(HttpSession session) {
        session.removeAttribute("doctorObj");
        session.invalidate();
        return ResponseEntity.ok("Doctor logout successful");

    }

        // Update Appointment Status
        @PostMapping("/updateStatus")
        public ResponseEntity<?> updateAppointmentStatus(@RequestParam int id, @RequestParam int doctorId, @RequestParam String comment) {
            boolean updated = appointmentService.updateDrAppointmentCommentStatus(id, doctorId, comment);
            if (updated) {
                return ResponseEntity.ok("Comment updated successfully");
            } else {
                return ResponseEntity.status(500).body("Something went wrong on the server!");
            }
        }

        @GetMapping("/count")
        public ResponseEntity<Long> getTotalDoctors() {
            long count = doctorService.countTotalDoctors();
            return ResponseEntity.ok(count);
        }

        @GetMapping("/count/{doctorId}")
        public ResponseEntity<Long> getTotalAppointments(@PathVariable int doctorId) {
            long count = appointmentService.countAppointmentsByDoctor(doctorId);
            return ResponseEntity.ok(count);
        }
}
