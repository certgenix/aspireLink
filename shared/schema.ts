import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const mentorRegistrations = pgTable("mentor_registrations", {
  id: serial("id").primaryKey(),
  // Professional data
  linkedinUrl: text("linkedin_url"),
  fullName: text("full_name").notNull(),
  currentJobTitle: text("current_job_title"),
  company: text("company"),
  yearsExperience: integer("years_experience"),
  education: text("education"),
  skills: text("skills").array(),
  location: text("location"),
  timeZone: text("time_zone"),
  profileSummary: text("profile_summary"),
  // Mentorship-specific fields
  preferredDisciplines: text("preferred_disciplines").array(),
  mentoringTopics: text("mentoring_topics").array(),
  availability: text("availability").array(),
  motivation: text("motivation"),
  agreedToCommitment: boolean("agreed_to_commitment").default(false),
  consentToContact: boolean("consent_to_contact").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertMentorRegistrationSchema = createInsertSchema(mentorRegistrations).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertMentorRegistration = z.infer<typeof insertMentorRegistrationSchema>;
export type MentorRegistration = typeof mentorRegistrations.$inferSelect;
