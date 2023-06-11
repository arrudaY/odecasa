package com.airbnb.service;

import com.airbnb.model.Reserva;
import com.airbnb.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService
{
	@Autowired
	ReservaRepository reservaRepository;
	
	
	public List<Reserva> buscarTodas()
	{
		return reservaRepository.findAll();
	}
	
	public Reserva cadastrarNovaReserva(Reserva reserva)
	{
		boolean estaReservada = verificarReserva(reserva);
		if(reserva.getDataInicial().isAfter(reserva.getDataFinal()))
			throw new RuntimeException("integridadeTemporal");
		if(estaReservada)
		{
			throw new RuntimeException("reservaExistente");
		}
		return reservaRepository.save(reserva);
		
	}
	public List<Reserva> findByProdutoId(Long id)
	{
		return reservaRepository.findByProdutoId(id);
	}

	
	public boolean verificarReserva(Reserva reservaASerCriada)
	{
		LocalDate dataVerificacao = reservaASerCriada.getDataInicial().toLocalDate();
		
		List<Reserva> reservas = findByProdutoId(reservaASerCriada.getProduto().getId());
		for(Reserva item : reservas)
		{
			LocalDate dataInicio = item.getDataInicial().toLocalDate();
			LocalDate dataDevolucao = item.getDataFinal().toLocalDate();
			
			if (!dataVerificacao.isBefore(dataInicio) && !dataVerificacao.isAfter(dataDevolucao)) {
				return true;
			}
		}
		return false;
	}
}
