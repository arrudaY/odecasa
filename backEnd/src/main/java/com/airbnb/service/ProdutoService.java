package com.airbnb.service;

import com.airbnb.model.Imagem;
import com.airbnb.model.Produto;
import com.airbnb.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService
{
	ProdutoRepository produtoRepository;
	@Autowired
	public ProdutoService(ProdutoRepository produtoRepository)
	{
		this.produtoRepository = produtoRepository;
	}
	
	@Transactional
	public Produto salvar(Produto produto)
	{
		for (Imagem imagem : produto.getImagemList()) {
			imagem.addProduto(produto);
		}
		return produtoRepository.save(produto);
	}
	
	public List<Produto> findAll()
	{
		return produtoRepository.findAll();
	}
	
	public Optional<Produto> findById(long id)
	{
		return produtoRepository.findById(id);
	}
	
	//Método personalizado criado no repositório. Retorna lista de produtos que tenha categoria com ID = parametro.
	public List<Produto> findByCategoria(long id)
	{
		return produtoRepository.findByCategoriaId(id);
	}
	
	//Método personalizado criado no repositório. Retorna lista de produtos que tenha cidade com ID = parametro.
	public List<Produto> findByCidade(long id)
	{
		return produtoRepository.findByCidadeId(id);
	}
	
	public boolean excluirId(long id)
	{
		if(produtoRepository.existsById(id))
		{
			produtoRepository.deleteById(id);
			return !produtoRepository.existsById(id);
		}
		return false;
	}

}
