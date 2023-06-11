package com.airbnb.service;

import com.airbnb.model.*;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ProdutoServiceTest
{
	@Autowired
	ProdutoService produtoService;
	@Autowired
	CategoriaService categoriaService;
	@Autowired
	CidadeService cidadeService;
	
	Produto produto;
	Categoria categoria;
	Cidade cidade;
	List<Imagem> imagemList = new ArrayList<>();
	List<Caracteristica> caracteristicaList = new ArrayList<>();
	
	Logger logger = LoggerFactory.getLogger(ProdutoServiceTest.class);
	
	@BeforeEach
	void beforeEach()
	{
		categoria = new Categoria("Descrição", "urlImagem");
		cidade = new Cidade();
		cidade.setNome("Nome Cidade");
		cidade.setPais("Pais cidade");
		
		cidade = cidadeService.salvar(cidade);
		categoria = categoriaService.salvar(categoria);
		
		imagemList.add(new Imagem(0, "titulo1", "url", null));
		imagemList.add(new Imagem(0, "titulo2", "url2", null));
		
		Caracteristica c1 = new Caracteristica();
		Caracteristica c2 = new Caracteristica();
		c1.setNome("nome");
		c1.setIcone("icone");
		c2.setNome("nome2");
		c2.setIcone("icone2");
		caracteristicaList.add(c1);
		caracteristicaList.add(c2);
		
		produto = new Produto();
		produto.setCategoria(categoria);
		produto.setCidade(cidade);
		produto.setDescricao("Descrição do produto");
		produto.setNome("nome do produto");
		produto.setQualificacao(5);
		produto.setTitulo("Titulo");
		produto.setCaracteristicaList(caracteristicaList);
		produto.setImagemList(imagemList);
	}
	
	
	@Test
	void salvar_returnTrue_whenProdutoIdIsGreaterThan0()
	{
		logger.info("Dando inicio ao salvamento do produto.");
		produto = produtoService.salvar(produto);
		logger.info("Produto salvo sob o ID: "+produto.getId());
		Assertions.assertTrue(produto.getId()>0);
		logger.info("Finalizando ao salvamento do produto.");
	}
	@Test
	void findAll_returnTrue_whenListExpectedEqualsListSaved()
	{
		logger.info("Iniciando teste de buscar todos os produtos.");
		
		List<Produto> listaExpected = new ArrayList<>();
		List<Produto> listaReturned;
		
		Produto produto2 = new Produto();
		produto2.setImagemList(produto.getImagemList());
		produto2.setCategoria(produto.getCategoria());
		produto2.setCaracteristicaList(produto.getCaracteristicaList());
		produto2.setCidade(produto.getCidade());
		produto2.setNome("produto2");
		produto2.setDescricao("descricao2");
		produto2.setQualificacao(4);
		produto2.setTitulo("Titulo 2");
		
		logger.info("Iniciando salvamento de dois produtos.");
		
		produto = produtoService.salvar(produto);
		listaExpected.add(produto);
		
		produto2 = produtoService.salvar(produto2);
		listaExpected.add(produto2);
		
		logger.info("Buscando produtos do banco.");
		listaReturned = produtoService.findAll();
		
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
	void findById_returnTrue_whenProdutoExists()
	{
		logger.info("Dando inicio ao findById.");
		produto = produtoService.salvar(produto);
		Optional<Produto> produtoOptional = produtoService.findById(produto.getId());
		Assertions.assertTrue(produtoOptional.isPresent());
		logger.info("Finalizando o findById.");
	}
	@Test
	void findByCategoria_returnTrue_whenProdutoExists()
	{
		logger.info("Dando inicio ao findBy CategoriaID.");
		produto = produtoService.salvar(produto);
		List<Produto> listProdutos = produtoService.findByCategoria(categoria.getId());
		Assertions.assertTrue(!listProdutos.isEmpty());
		logger.info("Finalizando o findBy CategoriaID.");
	}
	@Test
	void findByCidade_returnTrue_whenProdutoExists()
	{
		logger.info("Dando inicio ao findBy CidadeID.");
		produto = produtoService.salvar(produto);
		List<Produto> listProdutos = produtoService.findByCidade(cidade.getId());
		Assertions.assertTrue(!listProdutos.isEmpty());
		logger.info("Finalizando o findBy CidadeID.");
	}
	@Test
	void excluirId_returnTrue_whenProdutoExists()
	{
		logger.info("Iniciando teste de excluir Produto.");
		
		produto = produtoService.salvar(produto);
		
		boolean excluiu = produtoService.excluirId(produto.getId());
		
		Assertions.assertTrue(excluiu);
		logger.info("Finalizando teste de excluir produto.");
	}
	
}