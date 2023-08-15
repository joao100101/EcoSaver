package io.github.joao100101.controledegastos.repository;

import io.github.joao100101.controledegastos.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Optional<Categoria> findCategoriaByName(String name);

}
