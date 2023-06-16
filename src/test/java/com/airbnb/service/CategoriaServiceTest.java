package com.airbnb.service;

import com.airbnb.model.Categoria;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional //permite testar sem poluir o banco.
class CategoriaServiceTest
{
	@Autowired
	CategoriaService categoriaService;
	
	Categoria categoria;
	
	Logger logger = LoggerFactory.getLogger(CategoriaServiceTest.class);
	
	@BeforeEach
	void BeforeEach()
	{
		categoria = new Categoria("Descrição dos testes", "url.da.imagem.com.br");
	}
	
	@Test
	void salvar_returnTrue_whenCategoriaIDIsGreaterThan0()
	{
		logger.info("Iniciando teste de salvar nova categoria.");
		
		categoria = categoriaService.salvar(categoria);
		
		if(categoria.getId()<=0)
		{
			logger.error("A categoria não foi salva. Segue o ID retornado: " + categoria.getId());
		}
		
		Assertions.assertTrue(categoria.getId()>0);
		logger.info("Finalizando teste de salvar nova categoria.");
	}
//	@Test
	void buscarTudo_returnTrue_whenListExpectedEqualsListSaved()
	{
		logger.info("Iniciando teste de buscar todas as categorias.");
		List<Categoria> listaExpected = new ArrayList<>();
		List<Categoria> listaReturned;
		Categoria categoria2 = new Categoria("Descrição categoria 2", "url.image2.com");
		
		logger.info("Iniciando salvamento de duas categorias.");
		categoriaService.salvar(categoria);
		listaExpected.add(categoria);
		categoriaService.salvar(categoria2);
		listaExpected.add(categoria2);
		
		logger.info("Buscando categorias do banco.");
		listaReturned = categoriaService.buscarTudo();
		
		logger.info("Comparando listas.");
		
		if(!listaExpected.equals(listaReturned))
		{
			logger.error("As listas não são iguais. Verificar categorias presentes anteriormente no banco.");
			logger.error("Tamanho lista esperada: "+listaExpected.size() +", Tamanho lista Retornada: " + listaReturned.size());
		}
		
		Assertions.assertEquals(listaExpected, listaReturned);
		
		logger.info("Teste buscar todas finalizado");
	}
	
	@Test
	void alterar_returnTrue_whenCategoriaExpectedEqualsCategoriaUpdated()
	{
		logger.info("Iniciando teste de atualizar categoria.");
		categoria = categoriaService.salvar(categoria);
		
		categoria.setDescricao("Descrição atualizada");
		
		Categoria categoriaReturned = categoriaService.alterar(categoria);
		System.out.println(categoriaReturned);
		
		Assertions.assertEquals(categoria.getId(), categoriaReturned.getId());
		Assertions.assertEquals(categoria.getDescricao(), categoriaReturned.getDescricao());
		Assertions.assertEquals(categoria.getUrlImagem(), categoriaReturned.getUrlImagem());
		logger.info("Finalizando teste de atualizar categoria.");
	}
	
	@Test
	void alterar_returnFalse_whenCategoriaNotExists()
	{
		logger.info("Iniciando teste de alteração de categoria não existente.");
		categoria = categoriaService.alterar(categoria);
		Assertions.assertFalse(categoria.getId()>0);
		logger.info("finalizando teste de alteração de categoria não existente.");
	}
	
	@Test
	void excluirId_returnTrue_whenCategoriaExists()
	{
		logger.info("Iniciando teste de excluir categoria.");
		
		categoria = categoriaService.salvar(categoria);
		
		boolean excluiu = categoriaService.excluirId(categoria.getId());
		
		Assertions.assertTrue(excluiu);
		logger.info("Finalizando teste de excluir categoria.");
	}
	
}