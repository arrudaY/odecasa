package com.airbnb.repository;

import com.airbnb.model.Produto;
import com.airbnb.model.ProdutoCidadeTempoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long>
{
	List<Produto> findByCategoriaId(long id);
	
	List<Produto> findByCidadeId(long id);
	
	@Query(value = "SELECT * FROM RESERVAS R " +
			               " WHERE R.PRODUTO_ID = :id " +
			               " AND DATA_INICIAL >= :inicio" +
			               " AND DATA_FINAL <= :fim", nativeQuery = true)
	List<Produto> findByCidadePeriodo(@Param("id") Long id, @Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
	
}
