CREATE TABLE events (    
      id varchar(255) not null primary key,
      title varchar(255) not null,
      details varchar(255) not null,
      slug varchar(255) not null,
      maximum_attendees integer not null
);
