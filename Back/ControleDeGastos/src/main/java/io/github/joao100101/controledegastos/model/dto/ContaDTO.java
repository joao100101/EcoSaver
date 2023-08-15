package io.github.joao100101.controledegastos.model.dto;


import io.github.joao100101.controledegastos.model.Conta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContaDTO {
    private Long id;
    private String description;
    private Double value;
    private String categoriaName;

    public ContaDTO(Conta conta){
        this.id = conta.getId();
        this.description = conta.getDescription();
        this.value = conta.getValue();
        this.categoriaName = conta.getCategoria().getName();
    }
}
