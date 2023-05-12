package com.airbnb.service;

import com.airbnb.model.Categoria;
import com.airbnb.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoriaService
{
	
	private final CategoriaRepository repositorio;
	
	@Autowired
	public CategoriaService(CategoriaRepository repositorio)
	{
		this.repositorio=repositorio;
	}
	
	public Categoria salvar(Categoria categoria)
	{
		return repositorio.save(categoria);
	}
	
	public List<Categoria> buscarTudo()
	{
		return repositorio.findAll();
	}
	
	public List<Categoria> buscarTodas()
	{
		List<Categoria> categorias = new ArrayList<>();
		categorias.add(new Categoria(12, "desc", "url"));
		categorias.add(new Categoria(13, "desc2", "url2"));
		categorias.add(new Categoria(14, "desc3", "url3"));
		return categorias;
	}
}
