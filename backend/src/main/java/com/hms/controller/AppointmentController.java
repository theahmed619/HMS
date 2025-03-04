package com.hms.controller;

import com.hms.entity.Appointment;
import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;


    @PostMapping("/add")
    public ResponseEntity<?> bookAppointment(@RequestBody Map<String, Object> requestData) {
        try {
            Integer doctorId = (Integer) requestData.get("doctorId");
            Integer userId = (Integer) requestData.get("userId"); // Extract userId

            Appointment appointment = new Appointment();
            appointment.setFullName((String) requestData.get("fullName"));
            appointment.setGender((String) requestData.get("gender"));
            appointment.setAge((String) requestData.get("age"));
            appointment.setAppointmentDate((String) requestData.get("appointmentDate"));
            appointment.setEmail((String) requestData.get("email"));
            appointment.setPhone((String) requestData.get("phone"));
            appointment.setDiseases((String) requestData.get("diseases"));
            appointment.setAddress((String) requestData.get("address"));
            appointment.setStatus("pending");
            Appointment savedAppointment = appointmentService.bookAppointment(appointment, doctorId, userId);
            return ResponseEntity.ok(savedAppointment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }
    @GetMapping("/user/{userId}")
    public List<Appointment> getAppointmentsByUser(@PathVariable int userId) {
        return appointmentService.getAppointmentsByUserId(userId);
    }
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable int doctorId) {
        List<Appointment> appointments = appointmentService.getAllAppointmentByDoctor(doctorId);
        return ResponseEntity.ok(appointments);
    }
    
    // @PostMapping("/add")
    // public Appointment addAppointment(@RequestBody Appointment appointment) {
    //     return appointmentService.addAppointment(appointment);
    // }

   // @GetMapping("/user/{userId}")
   // public List<Appointment> getUserAppointments(@PathVariable int userId) {
  //      return appointmentService.getAppointmentsByUser(userId);
   // }

    //@GetMapping("/doctor/{doctorId}")
    // public List<Appointment> getDoctorAppointments(@PathVariable int doctorId) {
    //     return appointmentService.getAppointmentsByDoctor(doctorId);
    // }

    // @GetMapping("/{id}")
    // public Optional<Appointment> getAppointmentById(@PathVariable int id) {
    //     return appointmentService.getAppointmentById(id);
    // }

    // @PutMapping("/updateStatus/{id}")
    // public boolean updateAppointmentStatus(@PathVariable int id, @RequestParam String status) {
    //     return appointmentService.updateAppointmentStatus(id, status);
    // }

    // @GetMapping("/all")
    // public List<Appointment> getAllAppointments() {
    //     return appointmentService.getAllAppointments();
    // }

       @GetMapping("/count/{doctorId}")
    public ResponseEntity<Long> getTotalAppointments(@PathVariable int doctorId) {
        long count = appointmentService.countAppointmentsByDoctor(doctorId);
        return ResponseEntity.ok(count);
    }
}
