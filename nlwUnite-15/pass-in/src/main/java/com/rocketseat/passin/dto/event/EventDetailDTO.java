package com.rocketseat.passin.dto.event;

//O record é uma classe mais básica. Sem necessidade de getter and setter por exemplo.
public record EventDetailDTO(
            String id,
            Integer code,
            String title,
            String details,
            String slug,
            Integer maximumAttendees,
            Integer attendeesAmount) {

}
