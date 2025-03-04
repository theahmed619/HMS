package com.hms.repository;

import com.hms.entity.Appointment;
import com.hms.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

   

       // Get appointments by User ID
       List<Appointment> findByUserId(Long userId);

       // Get appointments by Doctor ID
       List<Appointment> findByDoctorId(Long doctorId);

       List<Appointment> findByUser(User user);

       List<Appointment> findByDoctorId(int doctorId);


    @Transactional
    @Modifying
    @Query("UPDATE Appointment a SET a.status = :comment WHERE a.id = :id AND a.doctor.id = :doctorId")
    void updateAppointmentComment(int id, int doctorId, String comment);

    long countByDoctorId(int doctorId);
}
