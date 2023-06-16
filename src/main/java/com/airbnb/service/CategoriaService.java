package com.airbnb.service;

import com.airbnb.model.Categoria;
import com.airbnb.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	public Categoria alterar(Categoria categoria)
	{
		long id = categoria.getId();
		if(repositorio.existsById(id))
		{
			return repositorio.save(categoria);
		}
		return new Categoria();
	}
	
	public boolean excluirId(long id)
	{
		if(repositorio.existsById(id))
		{
			repositorio.deleteById(id);
			return !repositorio.existsById(id);
		}
		return false;
	}
}
