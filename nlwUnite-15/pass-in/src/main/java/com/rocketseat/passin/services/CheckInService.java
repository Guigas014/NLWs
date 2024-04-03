package com.rocketseat.passin.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.rocketseat.passin.domain.attendee.Attendee;
import com.rocketseat.passin.domain.checkin.CheckIn;
import com.rocketseat.passin.domain.checkin.exceptions.CheckInAlreadyExistsException;
import com.rocketseat.passin.repositories.CheckInRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CheckInService {

      private final CheckInRepository checkInRepository;

      public void registerCheckIn(Attendee attendee) {
            this.verifyCheckInExists(attendee.getId());

            CheckIn newCheckIn = new CheckIn();

            newCheckIn.setAttendee(attendee);
            newCheckIn.setCreatedAt(LocalDateTime.now());

            this.checkInRepository.save(newCheckIn);
      }

      public void verifyCheckInExists(String attendeeId) {
            Optional<CheckIn> isCheckedIn = this.getCkechIn(attendeeId);

            if (isCheckedIn.isPresent())
                  throw new CheckInAlreadyExistsException("Attendee already checked in");

      }

      public Optional<CheckIn> getCkechIn(String attendeeId) {
            return this.checkInRepository.findByAttendeeId(attendeeId);
      }
}
