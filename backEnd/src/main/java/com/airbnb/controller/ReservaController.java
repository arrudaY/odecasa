package com.airbnb.controller;

import com.airbnb.model.Reserva;
import com.airbnb.service.ReservaService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/reserva")
public class ReservaController
{
	@Autowired
	ReservaService reservaService;
	
	@GetMapping
	public ResponseEntity buscarReservas()
	{
		return ResponseEntity.ok(reservaService.buscarTodas());
	}
	
	@GetMapping(value = "/findById")
	public ResponseEntity findByProduto(@RequestParam Long id) throws JsonProcessingException
	{
		List<Reserva> reservas = reservaService.findByProduto(id);
		if (reservas.isEmpty())
		{
			return new ResponseEntity("Sem reservas encontradas para o ID do produto.", HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(reservas);
	}
	
	@PostMapping
	public ResponseEntity salvarReserva(@RequestBody Reserva reserva)
	{
		try
		{
			reserva = reservaService.cadastrarNovaReserva(reserva);
		}
		catch(RuntimeException e)
		{
			if(e.getMessage() == "integridadeTemporal" )
				return new ResponseEntity("Reserva não efetuada: data de início após data de entrega.", HttpStatus.BAD_REQUEST);
			return new ResponseEntity("Reserva não efetuada: já há reserva para o período.", HttpStatus.BAD_REQUEST);
		}
		
		if (reserva.getId() < 0)
		{
			return new ResponseEntity("Reserva não efetuada.", HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok(reserva);
	}
}
