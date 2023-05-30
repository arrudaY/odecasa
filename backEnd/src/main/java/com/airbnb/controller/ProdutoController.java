package com.airbnb.controller;

import com.airbnb.model.Imagem;
import com.airbnb.model.Produto;
import com.airbnb.service.ProdutoService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/produto")
public class ProdutoController
{
	@Autowired
	ProdutoService produtoService;
	
	@GetMapping
	public ResponseEntity findAll()
	{
		return new ResponseEntity(produtoService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping(value = "/findById")
	public ResponseEntity findById(@RequestParam long id)
	{
		Optional<Produto> optional = produtoService.findById(id);
		if(optional.isPresent())
			return new ResponseEntity(optional.get(), HttpStatus.OK);
		
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}
	
	//Filtra produtos baseado na categoria. A busca é realizada baseando-se na ID da categoria, recebida como argumento. Retorna uma lista de produtos.
	@GetMapping(value = "/findByCategoria")
	public ResponseEntity findByCategoria(@RequestParam Long id)
	{
		List<Produto> listResult = produtoService.findByCategoria(id);
		if(listResult.isEmpty())
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		return new ResponseEntity(listResult, HttpStatus.OK);
	}
	
	@GetMapping(value = "/findByCidade")
	public ResponseEntity findByCidade(@RequestParam long id)
	{
		List<Produto> listResult = produtoService.findByCidade(id);
		if(listResult.isEmpty())
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		return new ResponseEntity(listResult, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody Produto produto)
	{
		produto = produtoService.salvar(produto);
		if(produto.getId()>0)
			return new ResponseEntity(produto, HttpStatus.CREATED);
		return new ResponseEntity("Produto não foi salvo", HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping
	public ResponseEntity excluirProduto(@RequestParam long id)
	{
		if(produtoService.excluirId(id))
			return new ResponseEntity(HttpStatus.OK);
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}
	
	
}
