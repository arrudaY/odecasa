package com.airbnb.repository;

import com.airbnb.model.Produto;
import com.airbnb.model.ProdutoCidadeTempoDTO;
import org.springframework.cglib.core.Local;
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
	
	
//	@Query("SELECT p FROM Produto p JOIN Reserva r " +
//			       "WHERE p.cidade.id = :id " +
//			       "AND r.dataInicial >= :inicio " +
//			       "AND r.dataFinal <= :fim")
	@Query("SELECT p FROM Produto p JOIN Reserva r " +
		       "WHERE p.cidade.id = :id " +
		       "AND NOT EXISTS( " +
			       " SELECT r FROM Reserva r" +
			       " WHERE r.produto = p" +
			       " AND r.dataInicial >= :inicio " +
			       " AND r.dataFinal <= :fim" +
		       ")")
	List<Produto> findByCidadePeriodo(@Param("id") Long id,
			@Param("inicio") LocalDateTime inicio,
			@Param("fim") LocalDateTime fim);
	
}
