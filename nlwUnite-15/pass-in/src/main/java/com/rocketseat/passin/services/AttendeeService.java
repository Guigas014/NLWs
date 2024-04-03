package com.rocketseat.passin.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.rocketseat.passin.domain.attendee.Attendee;
import com.rocketseat.passin.domain.attendee.exceptions.AttendeeAlreadyExistException;
import com.rocketseat.passin.domain.attendee.exceptions.AttendeeNotFoundException;
import com.rocketseat.passin.domain.checkin.CheckIn;
import com.rocketseat.passin.dto.attendee.AttendeeBadgeResponseDTO;
import com.rocketseat.passin.dto.attendee.AttendeeDetailsDTO;
import com.rocketseat.passin.dto.attendee.AttendeesListResponseDTO;
import com.rocketseat.passin.dto.attendee.AttendeeBadgeDTO;
import com.rocketseat.passin.repositories.AttendeeRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AttendeeService {

      private final AttendeeRepository attendeeRepository;
      private final CheckInService checkInService;

      public List<Attendee> getAllAttendeesFromEvent(String eventId) {
            return this.attendeeRepository.findByEventId(eventId);
      }

      public AttendeesListResponseDTO getEventsAttendee(String eventId) {
            List<Attendee> attendeeList = this.getAllAttendeesFromEvent(eventId);

            List<AttendeeDetailsDTO> attendeeDetailsList = attendeeList.stream().map(attendee -> {
                  Optional<CheckIn> checkIn = this.checkInService.getCkechIn(attendee.getId());
                  LocalDateTime checkedInAt = checkIn.map(CheckIn::getCreatedAt).orElse(null);

                  return new AttendeeDetailsDTO(attendee.getId(), attendee.getName(), attendee.getEmail(),
                              attendee.getCreatedAt(), checkedInAt);
            }).toList();

            return new AttendeesListResponseDTO(attendeeDetailsList);
      }

      public void verifyAttendeeSubscription(String email, String eventId) {
            Optional<Attendee> isAttendeeResgitered = this.attendeeRepository.findByEventIdAndEmail(eventId, email);

            if (isAttendeeResgitered.isPresent())
                  // throw new RuntimeException("Attendee is already registered");
                  throw new AttendeeAlreadyExistException("Attendee is already registered");
      }

      public Attendee registerAttendee(Attendee newAttendee) {
            this.attendeeRepository.save(newAttendee);

            return newAttendee;
      }

      public void checkInAttendee(String attendeeId) {
            Attendee attendee = this.getAttendee(attendeeId);

            this.checkInService.registerCheckIn(attendee);
      }

      private Attendee getAttendee(String attendeeId) {
            return this.attendeeRepository.findById(attendeeId)
                        .orElseThrow(() -> new AttendeeNotFoundException("Attendee not found with ID: " + attendeeId));
      }

      public AttendeeBadgeResponseDTO getAttendeeBadge(String attendeeId, UriComponentsBuilder uriComponentsBuilder) {
            Attendee attendee = this.getAttendee(attendeeId);

            var uri = uriComponentsBuilder.path("/attendees/{attendeeId}/check-in").buildAndExpand(attendeeId).toUri()
                        .toString();

            AttendeeBadgeDTO attendeeBadgeDTO = new AttendeeBadgeDTO(attendee.getName(), attendee.getEmail(), uri,
                        attendee.getEvent().getId());

            return new AttendeeBadgeResponseDTO(attendeeBadgeDTO);
      }

}
