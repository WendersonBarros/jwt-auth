\c authnode;

CREATE TABLE "account" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "login" VARCHAR(100) NOT NULL,
  "password" VARCHAR(100) NOT NULL
)
