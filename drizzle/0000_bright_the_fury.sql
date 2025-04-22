CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"googleId" varchar(255) NOT NULL,
	"photoUrl" varchar(255),
	CONSTRAINT "users_googleId_unique" UNIQUE("googleId")
);
