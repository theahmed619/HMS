package com.hms.service;

import com.hms.entity.Appointment;
import com.hms.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    public boolean bookAppointment(Appointment appointment) {
        try {
            // Save the appointment using JPA
            appointmentRepository.save(appointment);
            return true; // Successfully booked
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Booking failed
        }
    }


    // Create appointment
    public Appointment addAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // Get appointments for a specific user
    public List<Appointment> getAppointmentsByUser(int userId) {
        return appointmentRepository.findByUserId(userId);
    }

    // Get appointments for a specific doctor
    public List<Appointment> getAppointmentsByDoctor(int doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    // Get appointment by ID
    public Optional<Appointment> getAppointmentById(int id) {
        return appointmentRepository.findById(id);
    }

    // Update appointment status
    public boolean updateAppointmentStatus(int appointmentId, String status) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            appointmentRepository.save(appointment);
            return true;
        }
        return false;
    }

    public boolean updateDrAppointmentCommentStatus(int id, int doctorId, String comment) {
        try {
            appointmentRepository.updateAppointmentComment(id, doctorId, comment);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Get all appointments for admin panel
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAllByOrderByIdDesc();
    }

    public long countAppointmentsByDoctor(int doctorId) {
        return appointmentRepository.countByDoctorId(doctorId);
    }
}
