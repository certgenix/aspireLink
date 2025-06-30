import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertMentorRegistrationSchema } from "@shared/schema";
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

  // LinkedIn auto-fill simulation endpoint
  app.post("/api/linkedin-autofill", async (req, res) => {
    try {
      const { linkedinUrl } = req.body;
      
      if (!linkedinUrl || !linkedinUrl.includes('linkedin.com')) {
        return res.status(400).json({ error: "Invalid LinkedIn URL" });
      }

      // Simulate LinkedIn data extraction (mock data)
      const mockData = {
        fullName: "Sarah Thompson",
        currentJobTitle: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        yearsExperience: 7,
        education: "MS Computer Science, Stanford University",
        skills: ["JavaScript", "React", "Node.js", "Team Leadership", "Mentoring"],
        location: "San Francisco, CA",
        timeZone: "Pacific Time (PT)",
        profileSummary: "Passionate software engineer with 7+ years of experience building scalable web applications. I love mentoring junior developers and sharing knowledge about modern software development practices."
      };

      res.json({ success: true, data: mockData });
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

  const httpServer = createServer(app);

  return httpServer;
}
