import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertMentorRegistrationSchema, insertStudentRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // LinkedIn auto-fill endpoint - requires actual LinkedIn data extraction
  app.post("/api/linkedin-autofill", async (req, res) => {
    try {
      const { linkedinUrl } = req.body;
      
      if (!linkedinUrl || !linkedinUrl.includes('linkedin.com')) {
        return res.status(400).json({ error: "Invalid LinkedIn URL" });
      }

      // Real LinkedIn data extraction would require LinkedIn API or web scraping
      // For security and legal reasons, we cannot scrape LinkedIn profiles
      res.status(501).json({ 
        error: "LinkedIn auto-fill requires LinkedIn API integration",
        message: "Please contact support to enable LinkedIn integration for your organization."
      });
    } catch (error) {
      console.error("Error in LinkedIn auto-fill:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Mentor registration submission endpoint
  app.post("/api/mentor-registration", async (req, res) => {
    try {
      const registrationData = insertMentorRegistrationSchema.parse(req.body);
      const registration = await storage.createMentorRegistration(registrationData);
      res.json({ success: true, id: registration.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid registration data", details: error.errors });
      } else {
        console.error("Error creating mentor registration:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Get all mentor registrations (for admin purposes)
  app.get("/api/mentor-registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllMentorRegistrations();
      res.json(registrations);
    } catch (error) {
      console.error("Error fetching mentor registrations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Student registration submission endpoint
  app.post("/api/student-registration", async (req, res) => {
    try {
      const registrationData = insertStudentRegistrationSchema.parse(req.body);
      const registration = await storage.createStudentRegistration(registrationData);
      res.json({ success: true, id: registration.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid registration data", details: error.errors });
      } else {
        console.error("Error creating student registration:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Get all student registrations (for admin purposes)
  app.get("/api/student-registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllStudentRegistrations();
      res.json(registrations);
    } catch (error) {
      console.error("Error fetching student registrations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
