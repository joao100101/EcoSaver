package io.github.joao100101.controledegastos.repository;

import io.github.joao100101.controledegastos.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    UserDetails findByEmail(String email);
    Optional<User> findUserByEmail(String email);
}
