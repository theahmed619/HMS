package com.hms.service;

import com.hms.entity.User;
import com.hms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean registerUser(User user) {
        try {
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public User loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public boolean checkOldPassword(int userId, String oldPassword) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.map(user -> user.getPassword().equals(oldPassword)).orElse(false);
    }

    public boolean changePassword(int userId, String newPassword) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(newPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
