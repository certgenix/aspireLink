import { z } from "zod";

// ============ REGISTRATION TYPES (No Auth Required) ============

// Student Registration - submitted without signup
export interface StudentRegistration {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  linkedinUrl: string | null;
  universityName: string;
  academicProgram: string | null;
  yearOfStudy: string | null;
  nominatedBy: string | null;
  professorEmail: string | null;
  careerInterests: string | null;
  mentorshipGoals: string | null;
  preferredDisciplines: string[] | null;
  mentoringTopics: string[] | null;
  agreedToCommitment: boolean;
  consentToContact: boolean;
  status: 'pending' | 'linked';
  linkedUserId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Mentor Registration - submitted without signup
export interface MentorRegistration {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  linkedinUrl: string | null;
  currentJobTitle: string;
  company: string;
  yearsExperience: number | null;
  education: string | null;
  skills: string[] | null;
  location: string | null;
  timeZone: string | null;
  profileSummary: string | null;
  availability: string[] | null;
  motivation: string | null;
  preferredDisciplines: string[] | null;
  mentoringTopics: string[] | null;
  agreedToCommitment: boolean;
  consentToContact: boolean;
  status: 'pending' | 'linked';
  linkedUserId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Insert types for registrations
export interface InsertStudentRegistration {
  email: string;
  fullName: string;
  phoneNumber?: string | null;
  linkedinUrl?: string | null;
  universityName: string;
  academicProgram?: string | null;
  yearOfStudy?: string | null;
  nominatedBy?: string | null;
  professorEmail?: string | null;
  careerInterests?: string | null;
  mentorshipGoals?: string | null;
  preferredDisciplines?: string[] | null;
  mentoringTopics?: string[] | null;
  agreedToCommitment: boolean;
  consentToContact: boolean;
}

export interface InsertMentorRegistration {
  email: string;
  fullName: string;
  phoneNumber?: string | null;
  linkedinUrl?: string | null;
  currentJobTitle: string;
  company: string;
  yearsExperience?: number | null;
  education?: string | null;
  skills?: string[] | null;
  location?: string | null;
  timeZone?: string | null;
  profileSummary?: string | null;
  availability?: string[] | null;
  motivation?: string | null;
  preferredDisciplines?: string[] | null;
  mentoringTopics?: string[] | null;
  agreedToCommitment: boolean;
  consentToContact: boolean;
}

// Zod schemas for registration validation
export const insertStudentRegistrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().nullable().optional(),
  linkedinUrl: z.string().url().nullable().optional().or(z.literal('')),
  universityName: z.string().min(1, "University name is required"),
  academicProgram: z.string().nullable().optional(),
  yearOfStudy: z.string().nullable().optional(),
  nominatedBy: z.string().nullable().optional(),
  professorEmail: z.string().email().nullable().optional().or(z.literal('')),
  careerInterests: z.string().nullable().optional(),
  mentorshipGoals: z.string().nullable().optional(),
  preferredDisciplines: z.array(z.string()).nullable().optional(),
  mentoringTopics: z.array(z.string()).nullable().optional(),
  agreedToCommitment: z.boolean().refine(val => val === true, "You must agree to the commitment"),
  consentToContact: z.boolean().refine(val => val === true, "You must consent to contact"),
});

export const insertMentorRegistrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().nullable().optional(),
  linkedinUrl: z.string().url().nullable().optional().or(z.literal('')),
  currentJobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  yearsExperience: z.number().nullable().optional(),
  education: z.string().nullable().optional(),
  skills: z.array(z.string()).nullable().optional(),
  location: z.string().nullable().optional(),
  timeZone: z.string().nullable().optional(),
  profileSummary: z.string().nullable().optional(),
  availability: z.array(z.string()).nullable().optional(),
  motivation: z.string().nullable().optional(),
  preferredDisciplines: z.array(z.string()).nullable().optional(),
  mentoringTopics: z.array(z.string()).nullable().optional(),
  agreedToCommitment: z.boolean().refine(val => val === true, "You must agree to the commitment"),
  consentToContact: z.boolean().refine(val => val === true, "You must consent to contact"),
});

// ============ USER TYPES (After Signup with Auth) ============

// Unified User type - handles admin, mentor, and student roles
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'mentor' | 'student' | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Basic profile (all users)
  fullName: string | null;
  phoneNumber: string | null;
  linkedinUrl: string | null;
  profileImageUrl: string | null;
  
  // Mentor-specific fields
  currentJobTitle: string | null;
  company: string | null;
  yearsExperience: number | null;
  education: string | null;
  skills: string[] | null;
  location: string | null;
  timeZone: string | null;
  profileSummary: string | null;
  availability: string[] | null;
  motivation: string | null;
  
  // Student-specific fields
  universityName: string | null;
  academicProgram: string | null;
  yearOfStudy: string | null;
  nominatedBy: string | null;
  professorEmail: string | null;
  careerInterests: string | null;
  mentorshipGoals: string | null;
  
  // Shared preferences (mentor & student)
  preferredDisciplines: string[] | null;
  mentoringTopics: string[] | null;
  
  // Consent flags
  agreedToCommitment: boolean | null;
  consentToContact: boolean | null;
}

export interface UpsertUser {
  id?: string;
  email: string;
  role?: 'admin' | 'mentor' | 'student' | null;
  isActive?: boolean;
  fullName?: string | null;
  phoneNumber?: string | null;
  linkedinUrl?: string | null;
  profileImageUrl?: string | null;
  currentJobTitle?: string | null;
  company?: string | null;
  yearsExperience?: number | null;
  education?: string | null;
  skills?: string[] | null;
  location?: string | null;
  timeZone?: string | null;
  profileSummary?: string | null;
  availability?: string[] | null;
  motivation?: string | null;
  universityName?: string | null;
  academicProgram?: string | null;
  yearOfStudy?: string | null;
  nominatedBy?: string | null;
  professorEmail?: string | null;
  careerInterests?: string | null;
  mentorshipGoals?: string | null;
  preferredDisciplines?: string[] | null;
  mentoringTopics?: string[] | null;
  agreedToCommitment?: boolean | null;
  consentToContact?: boolean | null;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  createdAt: Date;
}

export interface Cohort {
  id: number;
  name: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  sessionsPerMonth: number | null;
  sessionDurationMinutes: number | null;
  isActive: boolean;
  createdAt: Date;
}

export interface CohortMember {
  id: number;
  cohortId: number;
  userId: string;
  role: 'mentor' | 'student';
  isActive: boolean;
  joinedAt: Date;
}

export interface Assignment {
  id: number;
  cohortId: number;
  mentorUserId: string;
  studentUserId: string;
  isActive: boolean;
  assignedAt: Date;
}

export interface MentoringSession {
  id: number;
  assignmentId: number;
  cohortId: number;
  scheduledDate: Date;
  scheduledTime: string;
  durationMinutes: number | null;
  status: 'scheduled' | 'completed' | 'cancelled' | null;
  meetingLink: string | null;
  notes: string | null;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

// Zod schemas for validation
export const insertUserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  role: z.enum(['admin', 'mentor', 'student']).nullable().optional(),
  isActive: z.boolean().optional().default(true),
  fullName: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
  linkedinUrl: z.string().url().nullable().optional().or(z.literal('')),
  profileImageUrl: z.string().url().nullable().optional(),
  currentJobTitle: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  yearsExperience: z.number().nullable().optional(),
  education: z.string().nullable().optional(),
  skills: z.array(z.string()).nullable().optional(),
  location: z.string().nullable().optional(),
  timeZone: z.string().nullable().optional(),
  profileSummary: z.string().nullable().optional(),
  availability: z.array(z.string()).nullable().optional(),
  motivation: z.string().nullable().optional(),
  universityName: z.string().nullable().optional(),
  academicProgram: z.string().nullable().optional(),
  yearOfStudy: z.string().nullable().optional(),
  nominatedBy: z.string().nullable().optional(),
  professorEmail: z.string().email().nullable().optional().or(z.literal('')),
  careerInterests: z.string().nullable().optional(),
  mentorshipGoals: z.string().nullable().optional(),
  preferredDisciplines: z.array(z.string()).nullable().optional(),
  mentoringTopics: z.array(z.string()).nullable().optional(),
  agreedToCommitment: z.boolean().nullable().optional(),
  consentToContact: z.boolean().nullable().optional(),
});

export const insertMentorSchema = insertUserSchema.extend({
  fullName: z.string().min(1, "Full name is required"),
  currentJobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  agreedToCommitment: z.boolean().refine(val => val === true, "You must agree to the commitment"),
  consentToContact: z.boolean().refine(val => val === true, "You must consent to contact"),
});

export const insertStudentSchema = insertUserSchema.extend({
  fullName: z.string().min(1, "Full name is required"),
  universityName: z.string().min(1, "University name is required"),
  nominatedBy: z.string().nullable().optional(),
  professorEmail: z.string().email("Invalid professor email").nullable().optional().or(z.literal('')),
  agreedToCommitment: z.boolean().refine(val => val === true, "You must agree to the commitment"),
  consentToContact: z.boolean().refine(val => val === true, "You must consent to contact"),
});

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().nullable().optional(),
  message: z.string().min(1, "Message is required"),
});

export const insertCohortSchema = z.object({
  name: z.string().min(1, "Cohort name is required"),
  description: z.string().nullable().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  sessionsPerMonth: z.number().nullable().optional(),
  sessionDurationMinutes: z.number().nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

export const insertCohortMemberSchema = z.object({
  cohortId: z.number(),
  userId: z.string(),
  role: z.enum(['mentor', 'student']),
  isActive: z.boolean().optional().default(true),
});

export const insertAssignmentSchema = z.object({
  cohortId: z.number(),
  mentorUserId: z.string(),
  studentUserId: z.string(),
  isActive: z.boolean().optional().default(true),
});

export const insertMentoringSessionSchema = z.object({
  assignmentId: z.number(),
  cohortId: z.number(),
  scheduledDate: z.coerce.date(),
  scheduledTime: z.string(),
  durationMinutes: z.number().nullable().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).nullable().optional(),
  meetingLink: z.string().optional().transform(val => {
    if (!val || val.trim() === '') return null;
    return val;
  }).pipe(z.string().url().nullable().optional()),
  notes: z.string().nullable().optional(),
  createdBy: z.string().nullable().optional(),
});

// Insert types derived from Zod schemas
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertCohort = z.infer<typeof insertCohortSchema>;
export type InsertCohortMember = z.infer<typeof insertCohortMemberSchema>;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
export type InsertMentoringSession = z.infer<typeof insertMentoringSessionSchema>;
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
  phoneNumber: text("phone_number"),
  // Mentorship-specific fields
  preferredDisciplines: text("preferred_disciplines").array(),
  mentoringTopics: text("mentoring_topics").array(),
  availability: text("availability").array(),
  motivation: text("motivation"),
  agreedToCommitment: boolean("agreed_to_commitment").default(false),
  consentToContact: boolean("consent_to_contact").default(false),
  // Admin fields
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const studentRegistrations = pgTable("student_registrations", {
  id: serial("id").primaryKey(),
  // Basic Information
  fullName: text("full_name").notNull(),
  emailAddress: text("email_address").notNull(),
  linkedinUrl: text("linkedin_url"),
  phoneNumber: text("phone_number"),
  universityName: text("university_name"),
  academicProgram: text("academic_program"),
  yearOfStudy: text("year_of_study"),
  // Nomination Verification
  nominatedBy: text("nominated_by").notNull(),
  professorEmail: text("professor_email").notNull(),
  // Mentorship Matching
  careerInterests: text("career_interests"),
  preferredDisciplines: text("preferred_disciplines").array(),
  mentoringTopics: text("mentoring_topics").array(),
  mentorshipGoals: text("mentorship_goals"),
  // Consent & Confirmation
  agreedToCommitment: boolean("agreed_to_commitment").default(false),
  consentToContact: boolean("consent_to_contact").default(false),
  // Admin fields
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Mentor-Student assignments table
export const mentorStudentAssignments = pgTable("mentor_student_assignments", {
  id: serial("id").primaryKey(),
  mentorId: integer("mentor_id").notNull().references(() => mentorRegistrations.id),
  studentId: integer("student_id").notNull().references(() => studentRegistrations.id),
  isActive: boolean("is_active").default(true),
  assignedAt: timestamp("assigned_at").defaultNow().notNull(),
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

export const insertStudentRegistrationSchema = createInsertSchema(studentRegistrations).omit({
  id: true,
  createdAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});

export const insertMentorStudentAssignmentSchema = createInsertSchema(mentorStudentAssignments).omit({
  id: true,
  assignedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertMentorRegistration = z.infer<typeof insertMentorRegistrationSchema>;
export type MentorRegistration = typeof mentorRegistrations.$inferSelect;
export type InsertStudentRegistration = z.infer<typeof insertStudentRegistrationSchema>;
export type StudentRegistration = typeof studentRegistrations.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertMentorStudentAssignment = z.infer<typeof insertMentorStudentAssignmentSchema>;
export type MentorStudentAssignment = typeof mentorStudentAssignments.$inferSelect;
