package com.rocketseat.passin.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocketseat.passin.domain.checkin.CheckIn;

public interface CheckInRepository extends JpaRepository<CheckIn, Integer> {

      Optional<CheckIn> findByAttendeeId(String attendeeId);
}
