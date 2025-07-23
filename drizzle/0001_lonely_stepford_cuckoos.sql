CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar(8) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"birth_day" timestamp NOT NULL,
	"gender" varchar(10) NOT NULL,
	CONSTRAINT "students_student_id_unique" UNIQUE("student_id")
);
--> statement-breakpoint
DROP TABLE "books" CASCADE;--> statement-breakpoint
DROP TABLE "genres" CASCADE;