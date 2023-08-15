package io.github.joao100101.controledegastos.service.impl;

import io.github.joao100101.controledegastos.exception.ContaNotFoundException;
import io.github.joao100101.controledegastos.model.Categoria;
import io.github.joao100101.controledegastos.model.Conta;
import io.github.joao100101.controledegastos.model.dto.ContaDTO;
import io.github.joao100101.controledegastos.repository.ContaRepository;
import io.github.joao100101.controledegastos.service.ContaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContaServiceImpl implements ContaService {

    private final ContaRepository contaRepository;
    private final CategoriaServiceImpl categoriaService;

    private static final String CONTA_NOT_FOUND = "Conta nao encontrada com identificador: ";

    @Autowired
    public ContaServiceImpl(ContaRepository contaRepository, CategoriaServiceImpl categoriaService) {
        this.categoriaService = categoriaService;
        this.contaRepository = contaRepository;
    }

    @Override
    public List<Conta> findAll() {
        return contaRepository.findAll();
    }

    @Override
    public List<ContaDTO> findAllDTO() {
        return contaRepository.findAll().stream().map(ContaDTO::new).toList();
    }

    @Override
    public Conta findById(Long id) {
        return this.contaRepository.findById(id).orElseThrow(() -> new ContaNotFoundException(CONTA_NOT_FOUND + id));
    }

    @Override
    public ContaDTO findDTOById(Long id) {
        return new ContaDTO(findById(id));
    }

    @Override
    public void deleteById(Long id) {
        findById(id);
        contaRepository.deleteById(id);
    }

    @Override
    public ContaDTO create(Conta conta) {
        return new ContaDTO(contaRepository.save(conta));
    }

    @Override
    public ContaDTO create(ContaDTO contaDTO) {
        Categoria categoria = categoriaService.findByName(contaDTO.getCategoriaName());
        Conta conta = new Conta(contaDTO);
        conta.setCategoria(categoria);
        return new ContaDTO(this.contaRepository.save(conta));
    }

    @Override
    public ContaDTO updateById(Long id, Conta conta) {
        findById(id);
        conta.setId(id);
        return new ContaDTO(this.contaRepository.save(conta));
    }
}
