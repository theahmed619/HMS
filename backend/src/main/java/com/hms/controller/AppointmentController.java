package com.hms.controller;

import com.hms.entity.Appointment;
import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/add")
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return appointmentService.addAppointment(appointment);
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> getUserAppointments(@PathVariable int userId) {
        return appointmentService.getAppointmentsByUser(userId);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getDoctorAppointments(@PathVariable int doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    @GetMapping("/{id}")
    public Optional<Appointment> getAppointmentById(@PathVariable int id) {
        return appointmentService.getAppointmentById(id);
    }

    @PutMapping("/updateStatus/{id}")
    public boolean updateAppointmentStatus(@PathVariable int id, @RequestParam String status) {
        return appointmentService.updateAppointmentStatus(id, status);
    }

    @GetMapping("/all")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

       @GetMapping("/count/{doctorId}")
    public ResponseEntity<Long> getTotalAppointments(@PathVariable int doctorId) {
        long count = appointmentService.countAppointmentsByDoctor(doctorId);
        return ResponseEntity.ok(count);
    }
}
