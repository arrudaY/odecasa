package com.airbnb.repository;

import com.airbnb.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long>
{
	List<Reserva> findByProdutoId(long id);
	
	List<Reserva> findByUsuarioId(long id);
	
}
