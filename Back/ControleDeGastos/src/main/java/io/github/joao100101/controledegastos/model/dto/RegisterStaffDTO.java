package io.github.joao100101.controledegastos.model.dto;

import io.github.joao100101.controledegastos.model.UserRole;

public record RegisterStaffDTO(String name, String username, String email, String password, UserRole role) {
}
