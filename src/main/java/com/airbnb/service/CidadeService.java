package com.airbnb.service;

import com.airbnb.model.Cidade;
import com.airbnb.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CidadeService
{
	 private final CidadeRepository repositorio;
	 @Autowired
	 public CidadeService(CidadeRepository repositorio)
	 {
		 this.repositorio = repositorio;
	 }
	 
	 public Cidade salvar(Cidade cidade)
	 {
		return repositorio.save(cidade);
	 }
	 
	 public List<Cidade> findAll()
	 {
		 return repositorio.findAll();
	 }
	 
	 public boolean exlcuirId(long id)
	 {
		 if(repositorio.existsById(id))
		 {
			repositorio.deleteById(id);
            return !repositorio.existsById(id);
		 }
		 return false;
	 }
}
