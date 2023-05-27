package com.airbnb.controller;

import com.airbnb.model.Cidade;
import com.airbnb.service.CidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/cidade")
public class CidadeController
{
	@Autowired
	CidadeService cidadeService;
	
	@GetMapping
	public ResponseEntity buscarTodas()
	{
		return new ResponseEntity(cidadeService.findAll(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity criarCidade(@RequestBody Cidade cidade)
	{
		cidade = cidadeService.salvar(cidade);
		if(cidade.getId()>0)
			return new ResponseEntity(cidade, HttpStatus.CREATED);
		
		return new ResponseEntity("A cidade não foi criada", HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping
	public ResponseEntity deletarCidade(@RequestParam long id)
	{
		if(cidadeService.exlcuirId(id))
			return new ResponseEntity(HttpStatus.OK);
		
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}
}
