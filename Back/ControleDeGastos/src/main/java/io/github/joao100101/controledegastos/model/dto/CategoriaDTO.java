package io.github.joao100101.controledegastos.model.dto;

import io.github.joao100101.controledegastos.model.Categoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaDTO {
    private Long id;
    private String name;
    private Integer contasAmount = 0;

    public CategoriaDTO(Categoria categoria){
        this.id = categoria.getId();
        this.name = categoria.getName();
        if(categoria.getContas() != null){
            this.contasAmount = categoria.getContas().size();
        }
    }

}
