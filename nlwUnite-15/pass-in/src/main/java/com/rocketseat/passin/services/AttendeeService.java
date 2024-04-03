package com.rocketseat.passin.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.rocketseat.passin.domain.attendee.Attendee;
import com.rocketseat.passin.domain.checkin.CheckIn;
import com.rocketseat.passin.dto.attendee.AttendeeDetailsDTO;
import com.rocketseat.passin.dto.attendee.AttendeesListResponseDTO;
import com.rocketseat.passin.repositories.AttendeeRepository;
import com.rocketseat.passin.repositories.CheckInRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AttendeeService {

      private final AttendeeRepository attendeeRepository;
      private final CheckInRepository checkInRepository;

      public List<Attendee> getAllAttendeesFromEvent(String eventId) {
            return this.attendeeRepository.findByEventId(eventId);
      }

      public AttendeesListResponseDTO getEventsAttendee(String eventId) {
            List<Attendee> attendeeList = this.getAllAttendeesFromEvent(eventId);

            List<AttendeeDetailsDTO> attendeeDetailsList = attendeeList.stream().map(attendee -> {
                  Optional<CheckIn> checkIn = this.checkInRepository.findByAttendeeId(attendee.getId());
                  LocalDateTime checkedInAt = checkIn.map(CheckIn::getCreatedAt).orElse(null);

                  return new AttendeeDetailsDTO(attendee.getId(), attendee.getName(), attendee.getEmail(),
                              attendee.getCreatedAt(), checkedInAt);
            }).toList();

            return new AttendeesListResponseDTO(attendeeDetailsList);
      }

}
