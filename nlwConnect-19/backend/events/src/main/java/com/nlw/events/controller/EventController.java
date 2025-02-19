package com.nlw.events.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nlw.events.model.Event;
import com.nlw.events.service.EventService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EventController {

      private final EventService eventService;

      @PostMapping("/events")
      public ResponseEntity<Event> addNewEvent(@RequestBody Event newEvent) {
            Event event = eventService.addNewEvent(newEvent);

            return ResponseEntity.status(HttpStatus.CREATED).body(event);
      }

      @GetMapping("/events")
      public List<Event> getAllEvents() {
            return eventService.getAllEvents();
      }

      @GetMapping("events/{prettyName}")
      public ResponseEntity<Event> getEventByPrettyName(@PathVariable String prettyName) {
            Event event = eventService.getEventByPrettyName(prettyName);

            if (event != null) {
                  return ResponseEntity.status(HttpStatus.OK).body(event);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
}
