package com.rocketseat.passin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocketseat.passin.domain.attendee.Attendee;

public interface AttendeeRepository extends JpaRepository<Attendee, String> {

}
