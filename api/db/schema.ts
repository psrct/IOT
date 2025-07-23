import * as t from "drizzle-orm/pg-core";

export const students = t.pgTable("students", {
  id: t.serial("id").primaryKey(),
  studentId: t.varchar("student_id", { length: 8 }).notNull().unique(),
  firstName: t.varchar("first_name", { length: 50 }).notNull(),
  lastName: t.varchar("last_name", { length: 50 }).notNull(),
  birthDay: t.timestamp().notNull(),
  gender: t.varchar("gender", { length: 10 }).notNull()
});