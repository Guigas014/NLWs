package com.rocketseat.passin.dto.event;

//Essa classe cria um objeto DTO e preenche com os dados do Event. E é usada na entrada de dados.
public record EventRequestDTO(
            String title,
            String details,
            Integer maximumAttendees) {
}
