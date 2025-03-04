package com.hms.service;

import com.hms.entity.Appointment;
import com.hms.entity.Doctor;
import com.hms.entity.User;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

 @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;
    
    public Appointment bookAppointment(Appointment appointment, Integer doctorId, Integer userId) {
        // Fetch doctor from DB
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Fetch user from DB
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set doctor and user objects to the appointment
        appointment.setDoctor(doctor);
        appointment.setUser(user);

        // Save and return the appointment
        return appointmentRepository.save(appointment);
    }
   
    public List<Appointment> getAppointmentsByUserId(int userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(appointmentRepository::findByUser).orElseThrow(() -> new RuntimeException("User not found"));
    }
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public Appointment getAppointmentById(int id) {
        return appointmentRepository.findById(id).orElse(null);
    }
      // Update Doctor's Comment for an Appointment
      public boolean updateAppointmentComment(int id, int doctorId, String comment) {
        Appointment appointment = appointmentRepository.findById(id).orElse(null);
        if (appointment != null && appointment.getDoctor().getId().equals(doctorId)) {
            appointment.setComment(comment);
            appointment.setStatus("Updated");
            appointmentRepository.save(appointment);
            return true;
        }
        return false;
    }
   
    public List<Appointment> getAllAppointmentByDoctor(int doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }
    
    // Get appointments for a specific user
    // public List<Appointment> getAppointmentsByUser(int userId) {
    //     return appointmentRepository.findByUserId(userId);
    // }

    // Get appointments for a specific doctor
    // public List<Appointment> getAppointmentsByDoctor(int doctorId) {
    //     return appointmentRepository.findByDoctorId(doctorId);
    // }

   

    // Update appointment status
    // public boolean updateAppointmentStatus(int appointmentId, String status) {
    //     Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
    //     if (optionalAppointment.isPresent()) {
    //         Appointment appointment = optionalAppointment.get();
    //         appointment.setStatus(status);
    //         appointmentRepository.save(appointment);
    //         return true;
    //     }
    //     return false;
    // }



    // Get all appointments for admin panel
    // public List<Appointment> getAllAppointments() {
    //     return appointmentRepository.findAllByOrderByIdDesc();
    // }

    public long countAppointmentsByDoctor(int doctorId) {
        return appointmentRepository.countByDoctorId(doctorId);
    }
}
