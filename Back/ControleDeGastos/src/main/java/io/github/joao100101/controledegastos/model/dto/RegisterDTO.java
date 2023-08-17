package io.github.joao100101.controledegastos.model.dto;

import io.github.joao100101.controledegastos.model.UserRole;

public record RegisterDTO(String name, String cpf, String email, String password, UserRole role) {
}
