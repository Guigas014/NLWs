package com.rocketseat.passin.services;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rocketseat.passin.domain.attendee.Attendee;
import com.rocketseat.passin.domain.event.Event;
import com.rocketseat.passin.domain.event.exceptions.EventFullException;
import com.rocketseat.passin.domain.event.exceptions.EventNotFoundException;
import com.rocketseat.passin.dto.attendee.AttendeeIdDTO;
import com.rocketseat.passin.dto.attendee.AttendeeRequestDTO;
import com.rocketseat.passin.dto.event.EventIdDTO;
import com.rocketseat.passin.dto.event.EventRequestDTO;
import com.rocketseat.passin.dto.event.EventResponseDTO;
import com.rocketseat.passin.repositories.EventRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventService {

      private final EventRepository eventRepository;
      private final AttendeeService attendeeService;

      public EventResponseDTO getEventDetail(String eventId) {
            Event event = this.getEventById(eventId);
            List<Attendee> attendeeList = this.attendeeService.getAllAttendeesFromEvent(eventId);

            return new EventResponseDTO(event, attendeeList.size());
      }

      public EventIdDTO createEvent(EventRequestDTO eventDTO) {
            Event newEvent = new Event();

            newEvent.setTitle(eventDTO.title());
            newEvent.setDetails(eventDTO.details());
            newEvent.setMaximumAttendees(eventDTO.maximumAttendees());
            newEvent.setSlug(this.createSlug(eventDTO.title()));

            this.eventRepository.save(newEvent);

            return new EventIdDTO(newEvent.getId());
      }

      public AttendeeIdDTO registerAttendeeOnEvent(String eventId, AttendeeRequestDTO attendeeRequestDTO) {
            this.attendeeService.verifyAttendeeSubscription(attendeeRequestDTO.email(), eventId);

            Event event = this.getEventById(eventId);
            List<Attendee> attendeeList = this.attendeeService.getAllAttendeesFromEvent(eventId);

            if (event.getMaximumAttendees() <= attendeeList.size())
                  throw new EventFullException("Event is full");

            Attendee newAttendee = new Attendee();
            newAttendee.setName(attendeeRequestDTO.name());
            newAttendee.setEmail(attendeeRequestDTO.email());
            newAttendee.setEvent(event);
            newAttendee.setCreatedAt(LocalDateTime.now());

            this.attendeeService.registerAttendee(newAttendee);

            return new AttendeeIdDTO(newAttendee.getId());
      }

      // Esse método é usado em dois métodos acima.
      private Event getEventById(String eventId) {
            return this.eventRepository.findById(eventId)
                        .orElseThrow(() -> new EventNotFoundException("Event not found with ID: " + eventId));
      }

      // Decomposição canonica = São Paulo -> sao-paulo
      private String createSlug(String text) {
            String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);
            return normalized.replaceAll("[\\p{InCOMBINING_DIACRITICAL_MARKS}]", "")
                        .replaceAll("[^\\w\\s]", "")
                        .replaceAll("\\s+", "-")
                        .toLowerCase();
      }

}
