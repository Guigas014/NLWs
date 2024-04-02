CREATE TABLE attendees (
      id varchar(255) not null primary key,
      name varchar(255) not null,
      email varchar(255) not null,
      event_id varchar(255) not null,
      created_at timestamp default current_timestamp,

      CONSTRAINT attendees_event_id_fkey FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
