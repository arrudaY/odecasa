package com.airbnb.repository;

import com.airbnb.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long>
{
	List<Produto> findByCategoriaId(long id);
	
	List<Produto> findByCidadeId(long id);
	
}
