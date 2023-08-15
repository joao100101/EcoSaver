package io.github.joao100101.controledegastos.controller;

import io.github.joao100101.controledegastos.model.Categoria;
import io.github.joao100101.controledegastos.model.dto.CategoriaDTO;
import io.github.joao100101.controledegastos.service.impl.CategoriaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    private CategoriaServiceImpl categoriaService;

    @Autowired
    public CategoriaController(CategoriaServiceImpl categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> findAll(){

        return ResponseEntity.ok(categoriaService.findAllDTO());
    }

    @GetMapping("{name}")
    private ResponseEntity<CategoriaDTO> findByName(@PathVariable String name){

        return ResponseEntity.ok(categoriaService.findDTOByName(name));
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoriaDTO> findById(@PathVariable Long id){

        return ResponseEntity.ok(categoriaService.findDTOById(id));
    }

    @PostMapping
    public ResponseEntity<CategoriaDTO> create(@RequestBody Categoria categoria){
        CategoriaDTO saved = categoriaService.create(categoria);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();
        return ResponseEntity.created(location).body(saved);
    }

    @PutMapping("{id}")
    public ResponseEntity<CategoriaDTO> update(@PathVariable Long id, @RequestBody Categoria categoria){
        return ResponseEntity.ok(categoriaService.updateById(id, categoria));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        categoriaService.deleteById(id);
        return ResponseEntity.ok("Conta deletada com sucesso.");
    }
}
