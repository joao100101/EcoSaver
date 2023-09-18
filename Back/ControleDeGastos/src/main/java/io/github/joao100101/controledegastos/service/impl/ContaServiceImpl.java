package io.github.joao100101.controledegastos.service.impl;

import io.github.joao100101.controledegastos.exception.ContaNotFoundException;
import io.github.joao100101.controledegastos.model.Categoria;
import io.github.joao100101.controledegastos.model.Conta;
import io.github.joao100101.controledegastos.model.User;
import io.github.joao100101.controledegastos.model.dto.ContaDTO;
import io.github.joao100101.controledegastos.repository.ContaRepository;
import io.github.joao100101.controledegastos.service.ContaService;
import io.github.joao100101.controledegastos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ContaServiceImpl implements ContaService {

    private final ContaRepository contaRepository;
    private final CategoriaServiceImpl categoriaService;
    private final UserServiceImpl userService;

    private static final String CONTA_NOT_FOUND = "Conta nao encontrada com identificador: ";

    @Autowired
    public ContaServiceImpl(ContaRepository contaRepository, CategoriaServiceImpl categoriaService, UserServiceImpl userService) {
        this.categoriaService = categoriaService;
        this.contaRepository = contaRepository;
        this.userService = userService;
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
        User user = userService.findByEmail(contaDTO.getUserEmail());
        Conta conta = new Conta(contaDTO, user);
        conta.setCategoria(categoria);
        return new ContaDTO(this.contaRepository.save(conta));
    }

    @Override
    public ContaDTO updateById(Long id, ContaDTO conta) {
        Conta existentConta = findById(id);
        existentConta.setId(id);
        existentConta.setCategoria(categoriaService.findByName(conta.getCategoriaName()));
        existentConta.setDate(conta.getDate());
        existentConta.setValue(conta.getValue());
        existentConta.setDescription(conta.getDescription());
        return new ContaDTO(this.contaRepository.save(existentConta));
    }
}
