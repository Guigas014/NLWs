package com.nlw.events.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nlw.events.model.Event;
import com.nlw.events.repository.EventRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventService {

      private final EventRepository eventRepository;

      public Event addNewEvent(Event event) {
            event.setPrettyName(event.getTitle().toLowerCase().replaceAll(" ", "-"));

            return eventRepository.save(event);
      }

      public List<Event> getAllEvents() {
            return (List<Event>) eventRepository.findAll();
      }

      public Event getEventByPrettyName(String prettyName) {
            return eventRepository.findByPrettyName(prettyName);
      }
}
