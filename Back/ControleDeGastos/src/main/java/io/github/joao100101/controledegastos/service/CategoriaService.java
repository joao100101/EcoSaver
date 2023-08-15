package io.github.joao100101.controledegastos.service;

import io.github.joao100101.controledegastos.model.Categoria;
import io.github.joao100101.controledegastos.model.dto.CategoriaDTO;

import java.util.List;
import java.util.Optional;

public interface CategoriaService {

    List<Categoria> findAll();
    List<CategoriaDTO> findAllDTO();
    Categoria findById(Long id);
    CategoriaDTO findDTOByName(String name);
    Categoria findByName(String name);
    CategoriaDTO findDTOById(Long id);
    void deleteById(Long id);
    CategoriaDTO create(Categoria categoria);
    Optional<CategoriaDTO> createIfNotExists(Categoria categoria);
    CategoriaDTO updateById(Long id, Categoria categoria);
    Boolean categoriaExists(Long id);
    Boolean categoriaExists(String name);
}
