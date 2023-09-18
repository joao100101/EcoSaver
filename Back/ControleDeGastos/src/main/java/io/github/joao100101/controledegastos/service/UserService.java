package io.github.joao100101.controledegastos.service;

import io.github.joao100101.controledegastos.model.User;

public interface UserService {
    User findByEmail(String email);
}
