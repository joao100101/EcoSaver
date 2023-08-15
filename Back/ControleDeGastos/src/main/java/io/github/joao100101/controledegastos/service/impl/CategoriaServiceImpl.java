package io.github.joao100101.controledegastos.service.impl;

import io.github.joao100101.controledegastos.exception.CategoriaAlreadyExists;
import io.github.joao100101.controledegastos.exception.CategoriaNotFoundException;
import io.github.joao100101.controledegastos.model.Categoria;
import io.github.joao100101.controledegastos.model.dto.CategoriaDTO;
import io.github.joao100101.controledegastos.repository.CategoriaRepository;
import io.github.joao100101.controledegastos.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private static final String CATEGORIA_NOT_FOUND = "Categoria nao encontrada com o identificador: ";
    private static final String CATEGORIA_ALREADY_EXISTS = "Ja existe uma categoria com o nome: ";
    @Autowired
    public CategoriaServiceImpl(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public List<Categoria> findAll() {
        return this.categoriaRepository.findAll();
    }

    @Override
    public List<CategoriaDTO> findAllDTO() {
        return this.categoriaRepository.findAll().stream().map(CategoriaDTO::new).toList();
    }

    @Override
    public Categoria findById(Long id) {
       return this.categoriaRepository.findById(id).orElseThrow(() -> new CategoriaNotFoundException(CATEGORIA_NOT_FOUND + id));
    }

    @Override
    public CategoriaDTO findDTOByName(String name) {
        Categoria categoria = this.categoriaRepository.findCategoriaByName(name).orElseThrow(() -> new CategoriaNotFoundException(CATEGORIA_NOT_FOUND + name));
        return new CategoriaDTO(categoria);
    }

    @Override
    public Categoria findByName(String name) {
        return this.categoriaRepository.findCategoriaByName(name).orElseThrow(() -> new CategoriaNotFoundException(CATEGORIA_NOT_FOUND + name));
    }

    @Override
    public CategoriaDTO findDTOById(Long id) {
        Categoria categoria = findById(id);
        return new CategoriaDTO(categoria);
    }

    @Override
    public void deleteById(Long id) {
        this.findById(id);
        this.categoriaRepository.deleteById(id);
    }

    @Override
    public CategoriaDTO create(Categoria categoria) {
        Optional<Categoria> optionalCategoria = this.categoriaRepository.findCategoriaByName(categoria.getName());
        if(optionalCategoria.isPresent()){
            throw new CategoriaAlreadyExists(CATEGORIA_ALREADY_EXISTS + categoria.getName());
        }
        return new CategoriaDTO(this.categoriaRepository.save(categoria));
    }

    @Override
    public CategoriaDTO updateById(Long id, Categoria categoria) {
        findById(id);
        categoria.setId(id);
        this.categoriaRepository.save(categoria);
        return new CategoriaDTO(categoria);
    }

    @Override
    public Boolean categoriaExists(Long id) {
        return categoriaRepository.findById(id).isPresent();
    }

    @Override
    public Boolean categoriaExists(String name) {
        return categoriaRepository.findCategoriaByName(name).isPresent();
    }

    @Override
    public Optional<CategoriaDTO> createIfNotExists(Categoria categoria) {
        Optional<Categoria> optionalCategoria = this.categoriaRepository.findCategoriaByName(categoria.getName());
        CategoriaDTO categoriaDTO = null;
        if(optionalCategoria.isEmpty()){
            categoriaDTO = new CategoriaDTO(this.categoriaRepository.save(categoria));
        }
        return Optional.ofNullable(categoriaDTO);
    }
}
