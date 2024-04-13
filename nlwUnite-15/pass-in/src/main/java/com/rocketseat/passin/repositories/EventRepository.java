package com.rocketseat.passin.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocketseat.passin.domain.event.Event;

public interface EventRepository extends JpaRepository<Event, String> {

      Optional<Event> findByCode(int newCode);

}
