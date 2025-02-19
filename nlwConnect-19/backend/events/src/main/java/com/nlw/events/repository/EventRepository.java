package com.nlw.events.repository;

import org.springframework.data.repository.CrudRepository;

import com.nlw.events.model.Event;

public interface EventRepository extends CrudRepository<Event, Integer> {

      public Event findByPrettyName(String prettyName);

}
