package com.rocketseat.passin.dto.event;

import com.rocketseat.passin.domain.event.Event;

import lombok.Getter;

//Essa classe cria um objeto DTO e preenche com os dados do Event. E é usada na saída de dados.
@Getter
public class EventResponseDTO {

      // Atributo
      EventDetailDTO event;

      public EventResponseDTO(Event event, Integer numberOfAteendees) {
            this.event = new EventDetailDTO(event.getId(), event.getCode(), event.getTitle(), event.getDetails(),
                        event.getSlug(),
                        event.getMaximumAttendees(), numberOfAteendees);
      }
}
