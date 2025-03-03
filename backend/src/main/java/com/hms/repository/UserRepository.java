package com.hms.repository;

import com.hms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    // Find user by email and password (for login)
    User findByEmailAndPassword(String email, String password);
    
    // Check if old password is correct
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.id = :userId AND u.password = :oldPassword")
    boolean existsByIdAndPassword(@Param("userId") int userId, @Param("oldPassword") String oldPassword);
}
