package com.airbnb.service;

import com.airbnb.model.Cidade;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CidadeServiceTest
{
	
	@Autowired
	CidadeService cidadeService;
	
	Cidade cidade;
	
	Logger logger = LoggerFactory.getLogger("Logger_CidadeServiceTest");
	
	@BeforeEach
	public void beforeEach()
	{
		cidade = new Cidade();
		cidade.setNome("Nome da cidade");
		cidade.setPais("Pais da cidade");
	}
	
	@Test
	void salvar_ReturnTrue_whenIDIsGreaterThan0()
	{
		logger.debug("iniciando teste de salvar cidade.");
		cidade = cidadeService.salvar(cidade);
		logger.debug("ID cidade após salvamento: " + cidade.getId());
		Assertions.assertTrue(cidade.getId()>0);
		logger.debug("fim teste de salvar cidade.");
	}
	@Test
	void findAll_returnTrue_whenListExpectedEqualsSavedList()
	{
		logger.info("iniciando teste de buscar todas as cidades.");
		List<Cidade> listaDeCidadesEsperadas = new ArrayList<>();
		List<Cidade> listaDeCidadesRetornadas;
		
		Cidade cidade2 = new Cidade();
		cidade2.setNome("Nome da cidade2");
		cidade2.setPais("Pais da cidade2");
		
		cidadeService.salvar(cidade);
		listaDeCidadesEsperadas.add(cidade);
		cidadeService.salvar(cidade2);
		listaDeCidadesEsperadas.add(cidade2);
		
		logger.info("Buscando todas as cidades no banco.");
		listaDeCidadesRetornadas = cidadeService.findAll();
		
		logger.info("Verificando retorno e resultado esperado.");
		if(!listaDeCidadesEsperadas.equals(listaDeCidadesRetornadas))
		{
			logger.error("A lista retornada não é igual a lista retornada.");
			logger.error("Tamanho lista esperada: " + listaDeCidadesEsperadas.size() +", Tamanho lista Retornada: " + listaDeCidadesRetornadas.size());
			logger.error("Verifique a existencia prévia de elementos no banco.");
		}
		
		Assertions.assertEquals(listaDeCidadesEsperadas, listaDeCidadesRetornadas);
		
		logger.info("Fim teste buscar todas as cidades.");
	}
	
	@Test
	void exlcuirId_returnTrue_whenCidadeExists()
	{
		logger.info("Iniciando teste de exclusão por ID");
		cidade = cidadeService.salvar(cidade);
		
		logger.info("Nova cidade salva. ID a ser excluido: " + cidade.getId());
		Boolean excluiu = cidadeService.exlcuirId(cidade.getId());
		
		Assertions.assertTrue(excluiu);
		logger.info("Fim teste de exclusão por ID.");
	}
	
	@Test
	void exlcuirID_returnFalse_whenCidadoDoesntExist()
	{
		logger.info("Iniciando teste de exclusão por ID de cidade que não existe");
		Cidade novaCidade = new Cidade();
		
		logger.info("Tentando exluir cidade com ID: "+ novaCidade.getId());
		Boolean excluiu = cidadeService.exlcuirId(novaCidade.getId());
		
		Assertions.assertFalse(excluiu);
		logger.info("Fim teste de exclusão por ID.");
	}
	
}