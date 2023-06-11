package com.airbnb.controller;

import com.airbnb.model.Categoria;
import com.airbnb.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value="/categoria")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoriaController
{
	@Autowired
	CategoriaService service;
	
	@GetMapping
	public ResponseEntity buscarTodas()
	{
		return new ResponseEntity(service.buscarTudo(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody Categoria categoria)
	{
		return new ResponseEntity(service.salvar(categoria), HttpStatus.CREATED);
	}
	
	@PatchMapping
	public ResponseEntity alterar(@RequestBody Categoria categoria)
	{
		categoria = service.alterar(categoria);
		if (categoria.getId() <= 0)
		{
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		else
		{
			return new ResponseEntity(service.alterar(categoria), HttpStatus.OK);
		}
	}
	
	@DeleteMapping
	public ResponseEntity excluir(@RequestParam long id)
	{
		return new ResponseEntity(service.excluirId(id) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
}
