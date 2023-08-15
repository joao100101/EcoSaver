package io.github.joao100101.controledegastos.service;

import io.github.joao100101.controledegastos.model.Conta;
import io.github.joao100101.controledegastos.model.dto.ContaDTO;

import java.util.List;

public interface ContaService {

    List<Conta> findAll();
    List<ContaDTO> findAllDTO();
    Conta findById(Long id);
    ContaDTO findDTOById(Long id);
    void deleteById(Long id);
    ContaDTO create(Conta conta);
    ContaDTO create(ContaDTO contaDTO);
    ContaDTO updateById(Long id, Conta conta);
}
