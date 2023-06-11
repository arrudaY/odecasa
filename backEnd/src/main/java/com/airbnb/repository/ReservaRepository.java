package com.airbnb.repository;

import com.airbnb.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long>
{
	
	List<Reserva> findByProdutoId(Long id);
	
}
