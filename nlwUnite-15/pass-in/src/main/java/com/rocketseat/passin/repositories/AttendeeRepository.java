package com.rocketseat.passin.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocketseat.passin.domain.attendee.Attendee;

public interface AttendeeRepository extends JpaRepository<Attendee, String> {

      List<Attendee> findByEventId(String id);

      Optional<Attendee> findByEventIdAndEmail(String eventId, String email);
}
