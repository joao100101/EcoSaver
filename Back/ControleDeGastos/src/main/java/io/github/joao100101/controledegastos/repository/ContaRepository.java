package io.github.joao100101.controledegastos.repository;

import io.github.joao100101.controledegastos.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContaRepository extends JpaRepository<Conta, Long> {

    Optional<List<Conta>> findByCategoriaName(String name);
}
