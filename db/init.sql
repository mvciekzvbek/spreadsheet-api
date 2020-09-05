CREATE TABLE previews (
  id serial PRIMARY KEY,
  uuid varchar (355) NOT NULL,
  preview json NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
