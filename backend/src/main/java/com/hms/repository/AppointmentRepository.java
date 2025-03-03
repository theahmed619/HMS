package com.hms.repository;

import com.hms.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    List<Appointment> findByUserId(int userId);

    List<Appointment> findByDoctorId(int doctorId);

    List<Appointment> findAllByOrderByIdDesc();

    @Transactional
    @Modifying
    @Query("UPDATE Appointment a SET a.status = :comment WHERE a.id = :id AND a.doctor.id = :doctorId")
    void updateAppointmentComment(int id, int doctorId, String comment);

    long countByDoctorId(int doctorId);
}
