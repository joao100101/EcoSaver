package io.github.joao100101.controledegastos.service.impl;

import io.github.joao100101.controledegastos.exception.UserNotFoundException;
import io.github.joao100101.controledegastos.model.User;
import io.github.joao100101.controledegastos.repository.UserRepository;
import io.github.joao100101.controledegastos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByEmail(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isEmpty()){
            throw new UserNotFoundException("Usuario nao encontrado.");
        }
        return user.get();
    }
}
