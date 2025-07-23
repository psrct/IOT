import { Hono } from "hono";
import drizzle from "../db/drizzle.js";
import { students } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import dayjs from "dayjs";

const route = new Hono();

route.get("/", async (c) => {
  const Allstudents = await drizzle.select().from(students);
  return c.json(Allstudents);
});

route.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const result = await drizzle.query.students.findFirst({
    where: eq(students.id, id)
  });
  if (!result) {
    return c.json({ error: "Student not found" }, 404);
  }
  return c.json(result);
});

route.post(
  "/",
  zValidator(
    "json",
    z.object({
      studentId: z.string().min(1),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      birthDay:  z.iso.datetime({ offset: true }).transform((data) => dayjs(data).toDate()),
      gender: z.string().min(1),
    })
  ),
  async (c) => {
    const { studentId, firstName, lastName, birthDay, gender } = c.req.valid("json");
    const result = await drizzle
      .insert(students)
      .values({
        studentId,
        firstName,
        lastName,
        birthDay,
        gender
      })
      .returning();
    return c.json({ success: true, students: result[0] }, 201);
  }
);

route.patch(
  "/:id",
  zValidator(
    "json",
     z.object({
      studentId: z.string().min(1),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      birthDay:  z.iso.datetime({ offset: true }).transform((data) => dayjs(data).toDate()),
      gender: z.string().min(1),
    })
  ),
  async (c) => {
    const id = Number(c.req.param("id"));
    const data = c.req.valid("json");
    const updated = await drizzle.update(students).set(data).where(eq(students.id, id)).returning();
    if (updated.length === 0) {
      return c.json({ error: "Student not found" }, 404);
    }
    return c.json({ success: true, students: updated[0] });
  }
);

route.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const deleted = await drizzle.delete(students).where(eq(students.id, id)).returning();
  if (deleted.length === 0) {
    return c.json({ error: "Student not found" }, 404);
  }
  return c.json({ success: true, students: deleted[0] });
});

export default route;