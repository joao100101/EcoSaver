package io.github.joao100101.controledegastos.model;


import io.github.joao100101.controledegastos.model.dto.ContaDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "contas")
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Descricao nao pode ser nula.")
    @NotEmpty(message =  "Descricao nao pode estar vazia.")
    private String description;
    @Min(value = 0, message = "Sao aceitos apenas valores positivos.")
    private Double value;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    public Conta(ContaDTO contaDTO){
        this.id = contaDTO.getId();
        this.description = contaDTO.getDescription();
        this.value = contaDTO.getValue();
    }

}
