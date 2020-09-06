CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE previews (
  uuid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  preview json NOT NULL,
  url varchar (355) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
