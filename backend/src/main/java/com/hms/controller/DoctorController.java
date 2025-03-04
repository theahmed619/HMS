package com.hms.controller;

import com.hms.entity.Appointment;
import com.hms.entity.Doctor;
import com.hms.entity.User;
import com.hms.service.AppointmentService;
import com.hms.service.DoctorService;

import jakarta.servlet.http.HttpSession;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
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
    // Doc Login
    @PostMapping("/login")
    public ResponseEntity<?> docUser(@RequestBody User user, HttpSession session) {
        Doctor loggedInDoctor = doctorService.loginDoctor(user.getEmail(), user.getPassword());
        if (loggedInDoctor != null) {
            session.setAttribute("doctor", loggedInDoctor);
            return ResponseEntity.ok(loggedInDoctor);
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password!");
        }
    }

    
    
        // @PostMapping("/login")
        // public ResponseEntity<Map<String, Object>> loginDoctor(@RequestBody Doctor doctor, HttpSession session) {
        //     Map<String, Object> response = new HashMap<>();
        
        //     Doctor loggedInDoctor = doctorService.loginDoctor(doctor.getEmail(), doctor.getPassword());
        
        //     if (loggedInDoctor != null) {
        //         session.setAttribute("docObj", loggedInDoctor);
        //         response.put("doctor", loggedInDoctor);
        //         response.put("message", "Login successful");
        //         return ResponseEntity.ok(response);
        //     } else {
        //         response.put("error", "Invalid email or password");
        //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        //     }
        // }
        
        @PostMapping("/update-comment")
        public ResponseEntity<String> updateComment(
            @RequestParam int id,
            @RequestParam int doctorId,
            @RequestParam String comment
        ) {
            Appointment appointment = appointmentService.getAppointmentById(id);
    
            if (appointment != null) {
                appointment.setComment(comment);
    
                // ✅ If doctor writes "Accept", set status to "Approved"
                if ("Accept".equalsIgnoreCase(comment.trim())) {
                    appointment.setStatus("Approved");
                } else {
                    appointment.setStatus("Pending");
                }
    
                appointmentService.save(appointment);
                return ResponseEntity.ok("Comment updated successfully!");
            }
            return ResponseEntity.badRequest().body("Appointment not found.");
        }
    

      @GetMapping("/logout")
    public ResponseEntity<?> doctorLogout(HttpSession session) {
        session.removeAttribute("doctorObj");
        session.invalidate();
        return ResponseEntity.ok("Doctor logout successful");

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

        @GetMapping("/all")
        public ResponseEntity<List<Doctor>> getAllDoctors() {
            List<Doctor> doctors = doctorService.getAllDoctors();
            return ResponseEntity.ok(doctors);
        }
    }