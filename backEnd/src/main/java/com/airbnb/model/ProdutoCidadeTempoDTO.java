package com.airbnb.model;

import java.time.LocalDateTime;

public record ProdutoCidadeTempoDTO(long cidadeId, LocalDateTime dataInicio, LocalDateTime dataFim)
{
}
