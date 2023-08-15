package io.github.joao100101.controledegastos.controller;

import io.github.joao100101.controledegastos.model.Conta;
import io.github.joao100101.controledegastos.model.dto.ContaDTO;
import io.github.joao100101.controledegastos.service.impl.ContaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/contas")
public class ContaController {

    private ContaServiceImpl contaService;

    @Autowired
    public ContaController(ContaServiceImpl contaService) {
        this.contaService = contaService;
    }

    @GetMapping
    public ResponseEntity<List<ContaDTO>> findAll(){

        return ResponseEntity.ok(contaService.findAllDTO());
    }


    @GetMapping("{id}")
    public ResponseEntity<ContaDTO> findById(@PathVariable  Long id){

        return ResponseEntity.ok(contaService.findDTOById(id));
    }

    @PostMapping
    public ResponseEntity<ContaDTO> create(@RequestBody ContaDTO conta){
        ContaDTO saved = contaService.create(conta);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();
        return ResponseEntity.created(location).body(saved);
    }

    @PutMapping("{id}")
    public ResponseEntity<ContaDTO> update(@PathVariable Long id, @RequestBody Conta conta){
        return ResponseEntity.ok(contaService.updateById(id, conta));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        contaService.deleteById(id);
        return ResponseEntity.ok("Conta deletada com sucesso.");
    }
}
