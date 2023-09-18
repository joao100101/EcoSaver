package io.github.joao100101.controledegastos.model.dto;


import io.github.joao100101.controledegastos.model.Conta;
import io.github.joao100101.controledegastos.model.User;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContaDTO {
    private Long id;
    @NotNull(message = "Descricao nao pode ser nula.")
    @NotEmpty(message =  "Descricao nao pode estar vazia.")
    private String description;
    private Double value;
    private LocalDate date;
    private String categoriaName;
    private String userEmail;

    public ContaDTO(Conta conta){
        this.id = conta.getId();
        this.description = conta.getDescription();
        this.date = conta.getDate();
        this.value = conta.getValue();
        this.categoriaName = conta.getCategoria().getName();
        this.userEmail = conta.getUser().getEmail();
    }
}
