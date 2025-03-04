package com.hms.service;

import com.hms.entity.Doctor;
import com.hms.entity.User;
import com.hms.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // Register a new doctor
    public Doctor registerDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Get all doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Get doctor by ID
    public Optional<Doctor> getDoctorById(int id) {
        return doctorRepository.findById(id);
    }

    // Update doctor details
    public Doctor updateDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Delete doctor by ID
    public void deleteDoctorById(int id) {
        doctorRepository.deleteById(id);
    }

    // Doctor login
    public Doctor loginDoctor(String email, String password) {
        return doctorRepository.findByEmailAndPassword(email, password);
    }

    // Count total doctors
    public long countTotalDoctors() {
        return doctorRepository.count();
    }

    // Search doctors by name or specialty
    public List<Doctor> searchDoctor(String keyword) {
        return doctorRepository.findByFullNameContainingOrSpecialistContaining(keyword, keyword);
    }

    // Check old password
    public boolean checkOldPassword(int doctorId, String oldPassword) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        return doctor.isPresent() && doctor.get().getPassword().equals(oldPassword);
    }

    // Change password
    public boolean changePassword(int doctorId, String newPassword) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        if (doctor.isPresent()) {
            doctor.get().setPassword(newPassword);
            doctorRepository.save(doctor.get());
            return true;
        }
        return false;
    }

    // Edit doctor profile
    public Doctor editDoctorProfile(Doctor doctor) {
        return doctorRepository.save(doctor);
    }
}
