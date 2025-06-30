import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Linkedin, 
  User, 
  Building, 
  GraduationCap, 
  MapPin, 
  Clock, 
  FileText,
  CheckCircle,
  Loader2,
  X
} from "lucide-react";

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

const availabilityOptions = [
  "Weekdays 9AM-5PM", "Weekdays 6PM-9PM", "Weekends Morning", 
  "Weekends Afternoon", "Flexible Schedule", "By Appointment Only"
];

interface LinkedInData {
  fullName: string;
  currentJobTitle: string;
  company: string;
  yearsExperience: number;
  education: string;
  skills: string[];
  location: string;
  timeZone: string;
  profileSummary: string;
}

export default function RegisterMentor() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinData, setLinkedinData] = useState<LinkedInData | null>(null);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [motivation, setMotivation] = useState("");
  const [agreedToCommitment, setAgreedToCommitment] = useState(false);
  const [consentToContact, setConsentToContact] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const autoFillMutation = useMutation({
    mutationFn: async (url: string) => {
      return apiRequest("/api/linkedin-autofill", "POST", { linkedinUrl: url });
    },
    onSuccess: (data: any) => {
      setLinkedinData(data.data);
      setStep(2);
      toast({
        title: "Profile Auto-Filled",
        description: "LinkedIn profile data has been successfully imported.",
      });
    },
    onError: () => {
      toast({
        title: "Auto-Fill Failed", 
        description: "Unable to fetch LinkedIn profile data. Please check the URL and try again.",
        variant: "destructive",
      });
    }
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/mentor-registration", "POST", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Registration Successful",
        description: "Thank you for registering as a mentor! We'll be in touch soon.",
      });
    },
    onError: () => {
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAutoFill = () => {
    if (!linkedinUrl.trim()) {
      toast({
        title: "LinkedIn URL Required",
        description: "Please enter your LinkedIn profile URL.",
        variant: "destructive",
      });
      return;
    }

    if (!linkedinUrl.includes('linkedin.com')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid LinkedIn profile URL.",
        variant: "destructive",
      });
      return;
    }

    setIsAutoFilling(true);
    autoFillMutation.mutate(linkedinUrl);
    setIsAutoFilling(false);
  };

  const handleSkipAutoFill = () => {
    setLinkedinData({
      fullName: "",
      currentJobTitle: "",
      company: "",
      yearsExperience: 0,
      education: "",
      skills: [],
      location: "",
      timeZone: "",
      profileSummary: ""
    });
    setStep(2);
  };

  const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleSubmit = () => {
    if (!linkedinData) return;

    if (selectedDisciplines.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one preferred discipline.",
        variant: "destructive",
      });
      return;
    }

    if (selectedTopics.length === 0) {
      toast({
        title: "Selection Required", 
        description: "Please select at least one mentoring topic.",
        variant: "destructive",
      });
      return;
    }

    if (selectedAvailability.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select your availability preferences.",
        variant: "destructive",
      });
      return;
    }

    if (!motivation.trim()) {
      toast({
        title: "Motivation Required",
        description: "Please explain why you want to be a mentor.",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToCommitment || !consentToContact) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the mentorship commitment and contact consent.",
        variant: "destructive",
      });
      return;
    }

    const registrationData = {
      linkedinUrl: linkedinUrl || null,
      fullName: linkedinData.fullName,
      currentJobTitle: linkedinData.currentJobTitle,
      company: linkedinData.company,
      yearsExperience: linkedinData.yearsExperience,
      education: linkedinData.education || null,
      skills: linkedinData.skills || null,
      location: linkedinData.location || null,
      timeZone: linkedinData.timeZone || null,
      profileSummary: linkedinData.profileSummary || null,
      preferredDisciplines: selectedDisciplines,
      mentoringTopics: selectedTopics,
      availability: selectedAvailability,
      motivation,
      agreedToCommitment,
      consentToContact
    };

    registrationMutation.mutate(registrationData);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-light-custom py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-charcoal-custom mb-4">
                Registration Successful!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for registering as an AspireLink mentor. We'll review your application 
                and contact you within 3-5 business days with next steps.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-charcoal-custom mb-2">What happens next?</h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>• Application review by our team</li>
                  <li>• Brief screening interview (15-20 minutes)</li>
                  <li>• Mentor orientation and training</li>
                  <li>• Student matching based on your preferences</li>
                </ul>
              </div>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-primary-custom hover:bg-primary-dark text-white"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-custom py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal-custom mb-4">
            Become a Mentor
          </h1>
          <p className="text-xl text-gray-600">
            Join AspireLink's mentorship program and help shape the next generation of professionals
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-primary-custom text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-custom' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-primary-custom text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5 text-blue-600" />
                <span>Step 1: LinkedIn Auto-Fill (Optional)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                <div className="flex space-x-3 mt-2">
                  <Input
                    id="linkedin-url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/in/your-profile"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAutoFill}
                    disabled={isAutoFilling || autoFillMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isAutoFilling || autoFillMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Auto-Fill Profile"
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter your LinkedIn URL to automatically fill your professional information
                </p>
              </div>

              <Separator />

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Don't want to use LinkedIn auto-fill? No problem!
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleSkipAutoFill}
                  className="border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white"
                >
                  Skip and Fill Manually
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && linkedinData && (
          <div className="space-y-8">
            {/* Auto-filled Profile Summary */}
            {linkedinUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-green-600" />
                    <span>Profile Summary</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Auto-filled from LinkedIn
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{linkedinData.fullName}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span>{linkedinData.currentJobTitle} at {linkedinData.company}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span>{linkedinData.education}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{linkedinData.location}</span>
                    </div>
                  </div>
                  {linkedinData.skills && linkedinData.skills.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Skills:</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {linkedinData.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Mentorship Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary-custom" />
                  <span>Step 2: Mentorship Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preferred Disciplines */}
                <div>
                  <Label className="text-base font-medium">Preferred Student Disciplines *</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Select the fields where you can provide valuable mentorship
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {disciplines.map((discipline) => (
                      <div
                        key={discipline}
                        onClick={() => toggleSelection(discipline, selectedDisciplines, setSelectedDisciplines)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedDisciplines.includes(discipline)
                            ? 'border-primary-custom bg-blue-50 text-primary-custom'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{discipline}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mentoring Topics */}
                <div>
                  <Label className="text-base font-medium">Mentoring Topics *</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    What areas can you help students with?
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {mentoringTopics.map((topic) => (
                      <div
                        key={topic}
                        onClick={() => toggleSelection(topic, selectedTopics, setSelectedTopics)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTopics.includes(topic)
                            ? 'border-secondary-custom bg-pink-50 text-secondary-custom'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <Label className="text-base font-medium">Availability *</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    When are you generally available for mentoring sessions?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availabilityOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => toggleSelection(option, selectedAvailability, setSelectedAvailability)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedAvailability.includes(option)
                            ? 'border-accent-custom bg-orange-50 text-accent-custom'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Clock className="w-4 h-4 inline mr-2" />
                        <span className="text-sm font-medium">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <Label htmlFor="motivation" className="text-base font-medium">
                    Why do you want to be a mentor? *
                  </Label>
                  <Textarea
                    id="motivation"
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="Share your motivation for mentoring students and what you hope to achieve through this program..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                {/* Agreements */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="commitment"
                      checked={agreedToCommitment}
                      onCheckedChange={(checked) => setAgreedToCommitment(checked === true)}
                    />
                    <Label htmlFor="commitment" className="text-sm leading-relaxed">
                      I agree to mentor 1-2 hours per month for 4 months and commit to supporting 
                      my assigned student(s) throughout the program duration.
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={consentToContact}
                      onCheckedChange={(checked) => setConsentToContact(checked === true)}
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed">
                      I consent to being contacted by AspireLink for program coordination, 
                      training, and feedback purposes.
                    </Label>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex space-x-4 pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-gray-300"
                  >
                    Back to LinkedIn
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={registrationMutation.isPending}
                    className="bg-primary-custom hover:bg-primary-dark text-white flex-1"
                  >
                    {registrationMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Submitting Registration...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}