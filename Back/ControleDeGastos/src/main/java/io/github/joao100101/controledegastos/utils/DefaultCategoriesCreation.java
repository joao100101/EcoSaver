package io.github.joao100101.controledegastos.utils;

import io.github.joao100101.controledegastos.exception.CategoriaAlreadyExists;
import io.github.joao100101.controledegastos.model.Categoria;
import io.github.joao100101.controledegastos.service.impl.CategoriaServiceImpl;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.SQLException;

@Component
public class DefaultCategoriesCreation implements CommandLineRunner {

    private CategoriaServiceImpl categoriaService;

    @Autowired
    public DefaultCategoriesCreation(CategoriaServiceImpl categoriaService) {
        this.categoriaService = categoriaService;
    }

    @Override
    public void run(String... args) throws Exception {
        Categoria cat1 = new Categoria("Alimentacao");
        Categoria cat2 = new Categoria("Saude");
        Categoria cat3 = new Categoria("Lazer");
        Categoria cat4 = new Categoria("Contas Fixas");
        Categoria cat5 = new Categoria("Servicos");


        categoriaService.createIfNotExists(cat1);
        categoriaService.createIfNotExists(cat2);
        categoriaService.createIfNotExists(cat3);
        categoriaService.createIfNotExists(cat4);
        categoriaService.createIfNotExists(cat5);
    }
}
