package com.rocketseat.passin.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.rocketseat.passin.dto.attendee.AttendeesListResponseDTO;
import com.rocketseat.passin.dto.event.EventIdDTO;
import com.rocketseat.passin.dto.event.EventRequestDTO;
import com.rocketseat.passin.dto.event.EventResponseDTO;
import com.rocketseat.passin.services.AttendeeService;
import com.rocketseat.passin.services.EventService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {

      private final EventService eventService;
      private final AttendeeService attendeeService;

      @GetMapping("/{eventId}")
      public ResponseEntity<EventResponseDTO> getEvent(@PathVariable String eventId) {
            EventResponseDTO event = this.eventService.getEventDetail(eventId);

            return ResponseEntity.ok(event);
      }

      @PostMapping
      public ResponseEntity<EventIdDTO> createEvent(@RequestBody EventRequestDTO body,
                  UriComponentsBuilder uriComponentsBuilder) {
            EventIdDTO eventIdDTO = this.eventService.createEvent(body);

            var uri = uriComponentsBuilder.path("/events/{id}").buildAndExpand(eventIdDTO.eventId()).toUri();

            return ResponseEntity.created(uri).body(eventIdDTO);
      }

      @GetMapping("/attendees/{id}")
      public ResponseEntity<AttendeesListResponseDTO> getEventAttendees(@PathVariable String id) {
            AttendeesListResponseDTO attendeesListResponse = this.attendeeService.getEventsAttendee(id);

            return ResponseEntity.ok(attendeesListResponse);
      }
}
