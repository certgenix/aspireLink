
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle, Users, Clock, Target, User, Mail, Phone, Building, GraduationCap, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

interface StudentData {
  fullName: string;
  emailAddress: string;
  linkedinUrl: string;
  phoneNumber: string;
  universityName: string;
  academicProgram: string;
  yearOfStudy: string;
  nominatedBy: string;
  professorEmail: string;
  careerInterests: string;
  preferredDisciplines: string[];
  mentoringTopics: string[];
  mentorshipGoals: string;
  agreedToCommitment: boolean;
  consentToContact: boolean;
}

const disciplines = [
  "Computer Science", "Engineering", "Business", "Marketing", "Design", 
  "Data Science", "Product Management", "Finance", "Healthcare", "Education",
  "Non-Profit", "Consulting", "Sales", "Operations", "Research"
];

const mentoringTopics = [
  "Career Planning", "Technical Skills", "Leadership", "Networking", 
  "Interview Preparation", "Resume Building", "Industry Insights", 
  "Work-Life Balance", "Entrepreneurship", "Professional Development",
  "Communication Skills", "Project Management", "Team Building"
];

const yearOfStudyOptions = [
  "1st year undergraduate", "2nd year undergraduate", "3rd year undergraduate", 
  "4th year undergraduate", "5th year undergraduate", "1st year master's", 
  "2nd year master's", "1st year PhD", "2nd year PhD", "3rd+ year PhD"
];

export default function RegisterStudent() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentData, setStudentData] = useState<StudentData>({
    fullName: "",
    emailAddress: "",
    linkedinUrl: "",
    phoneNumber: "",
    universityName: "",
    academicProgram: "",
    yearOfStudy: "",
    nominatedBy: "",
    professorEmail: "",
    careerInterests: "",
    preferredDisciplines: [],
    mentoringTopics: [],
    mentorshipGoals: "",
    agreedToCommitment: false,
    consentToContact: false
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const registrationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/student-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit registration");
      }
      
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/student-registrations"] });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleDiscipline = (discipline: string) => {
    setStudentData(prev => ({
      ...prev,
      preferredDisciplines: prev.preferredDisciplines.includes(discipline)
        ? prev.preferredDisciplines.filter(d => d !== discipline)
        : [...prev.preferredDisciplines, discipline]
    }));
  };

  const removeDiscipline = (discipline: string) => {
    setStudentData(prev => ({
      ...prev,
      preferredDisciplines: prev.preferredDisciplines.filter(d => d !== discipline)
    }));
  };

  const toggleMentoringTopic = (topic: string) => {
    setStudentData(prev => ({
      ...prev,
      mentoringTopics: prev.mentoringTopics.includes(topic)
        ? prev.mentoringTopics.filter(t => t !== topic)
        : [...prev.mentoringTopics, topic]
    }));
  };

  const removeMentoringTopic = (topic: string) => {
    setStudentData(prev => ({
      ...prev,
      mentoringTopics: prev.mentoringTopics.filter(t => t !== topic)
    }));
  };

  const handleNext = () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (step === 1) {
      if (!studentData.fullName.trim()) {
        toast({
          title: "Name Required",
          description: "Please enter your full name to continue.",
          variant: "destructive",
        });
        return;
      }
      if (!studentData.emailAddress.trim()) {
        toast({
          title: "Email Required",
          description: "Please enter your email address to continue.",
          variant: "destructive",
        });
        return;
      }
      // Email format validation
      if (!emailRegex.test(studentData.emailAddress.trim())) {
        toast({
          title: "Invalid Email Format",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
      if (!studentData.linkedinUrl.trim()) {
        toast({
          title: "LinkedIn URL Required",
          description: "Please enter your LinkedIn profile URL to continue.",
          variant: "destructive",
        });
        return;
      }
      if (!studentData.phoneNumber.trim()) {
        toast({
          title: "Phone Number Required",
          description: "Please enter your phone number to continue.",
          variant: "destructive",
        });
        return;
      }
      if (!studentData.universityName.trim()) {
        toast({
          title: "University Name Required",
          description: "Please enter your university name to continue.",
          variant: "destructive",
        });
        return;
      }
      if (!studentData.academicProgram.trim()) {
        toast({
          title: "Academic Program Required",
          description: "Please enter your academic program to continue.",
          variant: "destructive",
        });
        return;
      }
      if (!studentData.yearOfStudy.trim()) {
        toast({
          title: "Year of Study Required",
          description: "Please select your year of study to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 2) {
      if (!studentData.nominatedBy.trim()) {
        toast({
          title: "Nominator Required",
          description: "Please enter the professor's name who nominated you.",
          variant: "destructive",
        });
        return;
      }
      if (!studentData.professorEmail.trim()) {
        toast({
          title: "Professor Email Required",
          description: "Please enter your nominating professor's email address.",
          variant: "destructive",
        });
        return;
      }
      // Professor email format validation
      if (!emailRegex.test(studentData.professorEmail.trim())) {
        toast({
          title: "Invalid Professor Email Format",
          description: "Please enter a valid email address for the professor.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 3) {
      if (!studentData.careerInterests.trim()) {
        toast({
          title: "Career Interests Required",
          description: "Please describe your career interests and goals.",
          variant: "destructive",
        });
        return;
      }
      if (studentData.preferredDisciplines.length === 0) {
        toast({
          title: "Academic Disciplines Required",
          description: "Please select at least one academic discipline.",
          variant: "destructive",
        });
        return;
      }
      if (studentData.mentoringTopics.length === 0) {
        toast({
          title: "Mentoring Topics Required",
          description: "Please select at least one mentoring topic.",
          variant: "destructive",
        });
        return;
      }
      if (!studentData.mentorshipGoals.trim()) {
        toast({
          title: "Mentorship Goals Required",
          description: "Please describe your mentorship goals.",
          variant: "destructive",
        });
        return;
      }
    }

    setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!studentData.agreedToCommitment || !studentData.consentToContact) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the program commitment and contact consent.",
        variant: "destructive",
      });
      return;
    }

    const registrationData = {
      fullName: studentData.fullName,
      emailAddress: studentData.emailAddress,
      linkedinUrl: studentData.linkedinUrl,
      phoneNumber: studentData.phoneNumber,
      universityName: studentData.universityName,
      academicProgram: studentData.academicProgram,
      yearOfStudy: studentData.yearOfStudy,
      nominatedBy: studentData.nominatedBy,
      professorEmail: studentData.professorEmail,
      careerInterests: studentData.careerInterests.trim() || null,
      preferredDisciplines: studentData.preferredDisciplines.length > 0 ? studentData.preferredDisciplines : null,
      mentoringTopics: studentData.mentoringTopics.length > 0 ? studentData.mentoringTopics : null,
      mentorshipGoals: studentData.mentorshipGoals.trim() || null,
      agreedToCommitment: studentData.agreedToCommitment,
      consentToContact: studentData.consentToContact,
    };

    registrationMutation.mutate(registrationData);
  };

  // Show confirmation screen after successful submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white">
            <CardContent className="p-12">
              <div className="flex flex-col items-center space-y-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-14 h-14 text-green-600" />
                </div>
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold text-gray-900">
                    Registration Successful!
                  </h1>
                  <p className="text-lg text-gray-600 max-w-md">
                    Thank you for applying to AspireLink's mentorship program. We've received your registration and will review your application carefully.
                  </p>
                </div>
                <div className="bg-blue-50 p-8 rounded-xl w-full border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">What happens next?</h3>
                  <ul className="text-gray-700 space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>We'll contact your nominating professor to verify your nomination</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Our matching team will review your preferences and goals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>You'll receive an email within 2 weeks with your mentor match</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Your 4-month mentorship program will begin once both parties confirm</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                  <Link href="/">
                    <Button className="bg-primary-custom hover:bg-primary-dark text-white px-8 py-3 w-full sm:w-auto">
                      Return to Home
                    </Button>
                  </Link>
                  <Link href="/faq">
                    <Button variant="outline" className="px-8 py-3 w-full sm:w-auto border-gray-300">
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Student Registration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join AspireLink's mentorship program and connect with industry professionals who will guide your career journey
          </p>
        </div>

        {/* Enhanced Progress Indicator */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center space-x-8">
            {[1, 2, 3, 4].map((stepNumber, index) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-primary-custom text-white shadow-lg' 
                    : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}>
                  {stepNumber}
                  {step > stepNumber && (
                    <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
                  )}
                </div>
                {index < 3 && (
                  <div className={`w-24 h-1 mx-4 transition-all duration-300 ${
                    step > stepNumber ? 'bg-primary-custom' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                  <div className="w-10 h-10 bg-primary-custom rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block">Personal Information</span>
                    <span className="text-sm font-normal text-gray-600">Tell us about yourself and your academic background</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Contact Information Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary-custom" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          value={studentData.fullName}
                          onChange={(e) => setStudentData({...studentData, fullName: e.target.value})}
                          placeholder="Enter your full name"
                          className="h-12 border-gray-200 focus:border-primary-custom focus:ring-primary-custom"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emailAddress" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="emailAddress"
                          type="email"
                          value={studentData.emailAddress}
                          onChange={(e) => setStudentData({...studentData, emailAddress: e.target.value})}
                          placeholder="your.email@university.edu"
                          className="h-12 border-gray-200 focus:border-primary-custom focus:ring-primary-custom"
                        />
                        <p className="text-xs text-gray-500">University-affiliated email preferred</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number *
                        </Label>
                        <Input
                          id="phoneNumber"
                          value={studentData.phoneNumber}
                          onChange={(e) => setStudentData({...studentData, phoneNumber: e.target.value})}
                          placeholder="(555) 123-4567"
                          className="h-12 border-gray-200 focus:border-primary-custom focus:ring-primary-custom"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedinUrl" className="text-sm font-medium text-gray-700">
                          LinkedIn Profile URL *
                        </Label>
                        <Input
                          id="linkedinUrl"
                          type="url"
                          value={studentData.linkedinUrl}
                          onChange={(e) => setStudentData({...studentData, linkedinUrl: e.target.value})}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="h-12 border-gray-200 focus:border-primary-custom focus:ring-primary-custom"
                        />
                        <p className="text-xs text-gray-500">For professional profile verification</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary-custom" />
                      Academic Information
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="universityName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          University Name *
                        </Label>
                        <Input
                          id="universityName"
                          value={studentData.universityName}
                          onChange={(e) => setStudentData({...studentData, universityName: e.target.value})}
                          placeholder="Name of University"
                          className="h-12 border-gray-200 focus:border-primary-custom focus:ring-primary-custom"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="academicProgram" className="text-sm font-medium text-gray-700">
                          Academic Program / Major *
                        </Label>
                        <Input
                          id="academicProgram"
                          value={studentData.academicProgram}
                          onChange={(e) => setStudentData({...studentData, academicProgram: e.target.value})}
                          placeholder="Computer Science, Business, etc."
                          className="h-12 border-gray-200 focus:border-primary-custom focus:ring-primary-custom"
                        />
                      </div>

                      <div className="space-y-2 lg:col-span-2">
                        <Label className="text-sm font-medium text-gray-700">Year of Study *</Label>
                        <Select value={studentData.yearOfStudy} onValueChange={(value) => setStudentData({...studentData, yearOfStudy: value})}>
                          <SelectTrigger className="h-12 border-gray-200 focus:border-primary-custom focus:ring-primary-custom">
                            <SelectValue placeholder="Select your year of study" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearOfStudyOptions.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-gray-100 mt-8">
                  <Button onClick={handleNext} className="bg-primary-custom hover:bg-primary-dark text-white px-10 py-3 h-auto">
                    Continue to Nomination Verification →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block">Nomination Verification</span>
                    <span className="text-sm font-normal text-gray-600">Provide details about your nominating professor</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>Important:</strong> AspireLink requires nomination by a professor or academic advisor. 
                    We may contact your nominator to verify your application and ensure program quality.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nominatedBy" className="text-sm font-medium text-gray-700">
                      Professor's Full Name *
                    </Label>
                    <Input
                      id="nominatedBy"
                      value={studentData.nominatedBy}
                      onChange={(e) => setStudentData({...studentData, nominatedBy: e.target.value})}
                      placeholder="Dr. Jane Smith"
                      className="h-12 border-gray-200 focus:border-primary-custom focus:ring-primary-custom"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="professorEmail" className="text-sm font-medium text-gray-700">
                      Professor's Email Address *
                    </Label>
                    <Input
                      id="professorEmail"
                      type="email"
                      value={studentData.professorEmail}
                      onChange={(e) => setStudentData({...studentData, professorEmail: e.target.value})}
                      placeholder="professor@university.edu"
                      className="h-12 border-gray-200 focus:border-primary-custom focus:ring-primary-custom"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
                  <Button variant="outline" onClick={() => setStep(step - 1)} className="px-8 py-3 h-auto border-gray-300">
                    ← Back
                  </Button>
                  <Button onClick={handleNext} className="bg-primary-custom hover:bg-primary-dark text-white px-10 py-3 h-auto">
                    Continue to Matching Preferences →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block">Mentorship Matching</span>
                    <span className="text-sm font-normal text-gray-600">Help us find the perfect mentor for you</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="careerInterests" className="text-sm font-medium text-gray-700">
                      Career Interests & Goals *
                    </Label>
                    <Textarea
                      id="careerInterests"
                      value={studentData.careerInterests}
                      onChange={(e) => setStudentData({...studentData, careerInterests: e.target.value})}
                      placeholder="Describe your career interests, goals, and what you hope to achieve in your professional journey..."
                      className="min-h-[120px] border-gray-200 focus:border-primary-custom focus:ring-primary-custom resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Academic Disciplines *</Label>
                      <p className="text-xs text-gray-500 mt-1 mb-4">
                        Select disciplines that match your interests (choose at least one)
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {disciplines.map((discipline) => (
                        <Button
                          key={discipline}
                          variant={studentData.preferredDisciplines.includes(discipline) ? "default" : "outline"}
                          onClick={() => toggleDiscipline(discipline)}
                          className={`justify-start h-auto py-3 text-sm transition-all duration-200 ${
                            studentData.preferredDisciplines.includes(discipline) 
                              ? 'bg-primary-custom hover:bg-primary-dark text-white' 
                              : 'hover:bg-gray-50 border-gray-200'
                          }`}
                        >
                          {discipline}
                        </Button>
                      ))}
                    </div>
                    {studentData.preferredDisciplines.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-3">Selected Disciplines:</p>
                        <div className="flex flex-wrap gap-2">
                          {studentData.preferredDisciplines.map((discipline) => (
                            <Badge key={discipline} variant="secondary" className="flex items-center gap-2 py-1 px-3">
                              {discipline}
                              <X
                                className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                onClick={() => removeDiscipline(discipline)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Mentoring Topics *</Label>
                      <p className="text-xs text-gray-500 mt-1 mb-4">
                        Choose topics you'd like guidance on from your mentor
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {mentoringTopics.map((topic) => (
                        <Button
                          key={topic}
                          variant={studentData.mentoringTopics.includes(topic) ? "default" : "outline"}
                          onClick={() => toggleMentoringTopic(topic)}
                          className={`justify-start h-auto py-3 text-sm transition-all duration-200 ${
                            studentData.mentoringTopics.includes(topic) 
                              ? 'bg-primary-custom hover:bg-primary-dark text-white' 
                              : 'hover:bg-gray-50 border-gray-200'
                          }`}
                        >
                          {topic}
                        </Button>
                      ))}
                    </div>
                    {studentData.mentoringTopics.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-3">Selected Topics:</p>
                        <div className="flex flex-wrap gap-2">
                          {studentData.mentoringTopics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="flex items-center gap-2 py-1 px-3">
                              {topic}
                              <X
                                className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                onClick={() => removeMentoringTopic(topic)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="mentorshipGoals" className="text-sm font-medium text-gray-700">
                      Mentorship Goals & Expectations *
                    </Label>
                    <Textarea
                      id="mentorshipGoals"
                      value={studentData.mentorshipGoals}
                      onChange={(e) => setStudentData({...studentData, mentorshipGoals: e.target.value})}
                      placeholder="What do you hope to gain from this mentorship experience? Be specific about your expectations and goals..."
                      className="min-h-[120px] border-gray-200 focus:border-primary-custom focus:ring-primary-custom resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
                  <Button variant="outline" onClick={() => setStep(step - 1)} className="px-8 py-3 h-auto border-gray-300">
                    ← Back
                  </Button>
                  <Button onClick={handleNext} className="bg-primary-custom hover:bg-primary-dark text-white px-10 py-3 h-auto">
                    Continue to Confirmation →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block">Consent & Confirmation</span>
                    <span className="text-sm font-normal text-gray-600">Review and agree to program terms</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="bg-blue-50 p-8 rounded-xl mb-8 border border-blue-100">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Program Commitment</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    AspireLink's mentorship program is a structured 4-month experience designed to help you achieve your career goals. 
                    To ensure the best experience for both you and your mentor, we require active participation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Attend at least 4 virtual mentorship sessions over one academic semester</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Come prepared with questions and goals for each session</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Maintain professional communication with your mentor</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Provide feedback to help improve the program</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id="commitment"
                        checked={studentData.agreedToCommitment}
                        onCheckedChange={(checked) => 
                          setStudentData({...studentData, agreedToCommitment: !!checked})
                        }
                        className="mt-1"
                      />
                      <Label htmlFor="commitment" className="text-sm leading-relaxed text-gray-700">
                        I commit to attending at least 4 virtual mentorship sessions over one academic semester 
                        and actively participating in the program with professionalism and dedication.
                      </Label>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id="consent"
                        checked={studentData.consentToContact}
                        onCheckedChange={(checked) => 
                          setStudentData({...studentData, consentToContact: !!checked})
                        }
                        className="mt-1"
                      />
                      <Label htmlFor="consent" className="text-sm leading-relaxed text-gray-700">
                        I consent to being contacted by AspireLink regarding this program, including updates, 
                        mentor matching, program communications, and feedback requests.
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl mt-8 border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-2">Next Steps</h4>
                  <p className="text-sm text-green-700 leading-relaxed">
                    After submitting your application, we'll review your information and verify your nomination. 
                    You'll receive a confirmation email immediately and hear from us within 5-7 business days about your acceptance and mentor matching.
                  </p>
                </div>

                <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
                  <Button variant="outline" onClick={() => setStep(step - 1)} className="px-8 py-3 h-auto border-gray-300">
                    ← Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={registrationMutation.isPending}
                    className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 h-auto"
                  >
                    {registrationMutation.isPending ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
