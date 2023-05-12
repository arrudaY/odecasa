package com.airbnb.controller;

import com.airbnb.model.Categoria;
import com.airbnb.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@Controller
@RequestMapping(value="/categoria")
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
		return new ResponseEntity(service.salvar(categoria), HttpStatus.OK);
	}
}
