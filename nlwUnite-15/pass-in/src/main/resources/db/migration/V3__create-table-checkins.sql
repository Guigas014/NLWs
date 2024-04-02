CREATE TABLE check_ins (
      id integer not null primary key identity,
      created_at timestamp default current_timestamp,
      attendee_id varchar(255) not null,

      CONSTRAINT check_ins_attendee_id_fkey FOREIGN KEY (attendee_id) REFERENCES attendees (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
