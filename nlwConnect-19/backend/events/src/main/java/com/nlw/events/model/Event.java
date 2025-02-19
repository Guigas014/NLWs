package com.nlw.events.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_event")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Event {

      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      @Column(name = "event_id")
      private Integer eventId;
      private String title;

      @Column(name = "pretty_name")
      private String prettyName;

      private String location;

      private Double price;

      @Column(name = "start_date")
      private LocalDate startDate;

      @Column(name = "end_date")
      private LocalDate endDate;

      @Column(name = "start_time")
      private LocalTime startTime;

      @Column(name = "end_time")
      private LocalTime endTime;
}
