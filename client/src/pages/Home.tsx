import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Users,
  Star,
  UserPlus,
  Search,
  Video,
  Award,
  Heart,
  Lightbulb,
  Network,
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-inter font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal-custom leading-tight mb-6">
                Connect. Learn.{" "}
                <span className="text-primary-custom">Aspire.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join AspireLink's free mentorship program connecting students
                with experienced professionals through 4-month academic cohorts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/students">
                  <Button className="bg-primary-custom hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg">
                    Apply as Student
                  </Button>
                </Link>
                <Link href="/mentors">
                  <Button
                    variant="outline"
                    className="border-2 border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white px-8 py-4 rounded-lg font-semibold text-lg"
                  >
                    Become a Mentor
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2 w-4 h-4" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-primary-custom mr-2 w-4 h-4" />
                  <span>500+ Matches</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-accent-custom mr-2 w-4 h-4" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional mentorship meeting in modern office setting"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <Card className="absolute -bottom-6 -left-6 w-64 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Video className="text-green-600 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal-custom">
                        Monthly Sessions
                      </p>
                      <p className="text-sm text-gray-500">Virtual meetings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl md:text-4xl text-charcoal-custom mb-6">
              How AspireLink Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our structured 4-month program guides you through every step of
              professional mentorship
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center group card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary-custom bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-custom group-hover:bg-opacity-20 transition-colors duration-200">
                  <UserPlus className="text-primary-custom w-8 h-8" />
                </div>
                <h3 className="font-inter font-semibold text-xl text-charcoal-custom mb-4">
                  1. Nomination
                </h3>
                <p className="text-gray-600">
                  Students apply and get nominated by faculty or peers for the
                  program
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary-custom bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary-custom group-hover:bg-opacity-20 transition-colors duration-200">
                  <Search className="text-secondary-custom w-8 h-8" />
                </div>
                <h3 className="font-inter font-semibold text-xl text-charcoal-custom mb-4">
                  2. Matching
                </h3>
                <p className="text-gray-600">
                  AI-powered matching connects students with compatible mentors
                  based on goals and industry
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent-custom bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-custom group-hover:bg-opacity-20 transition-colors duration-200">
                  <Video className="text-accent-custom w-8 h-8" />
                </div>
                <h3 className="font-inter font-semibold text-xl text-charcoal-custom mb-4">
                  3. Sessions
                </h3>
                <p className="text-gray-600">
                  Monthly virtual meetings with structured guidance and goal
                  tracking
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-200">
                  <Award className="text-green-600 w-8 h-8" />
                </div>
                <h3 className="font-inter font-semibold text-xl text-charcoal-custom mb-4">
                  4. Recognition
                </h3>
                <p className="text-gray-600">
                  Celebrate achievements and build lasting professional
                  relationships
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-light-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl md:text-4xl text-charcoal-custom mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students and mentors who have transformed their careers
              through AspireLink
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-custom to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-charcoal-custom">
                      Sarah Chen
                    </h4>
                    <p className="text-sm text-gray-500">
                      Computer Science Student
                    </p>
                  </div>
                </div>
                <div className="text-accent-custom mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">
                  "My mentor helped me land my dream internship at a top tech
                  company. The monthly sessions gave me confidence and practical
                  skills I never learned in class."
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-custom to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-charcoal-custom">
                      Marcus Johnson
                    </h4>
                    <p className="text-sm text-gray-500">
                      Marketing Professional
                    </p>
                  </div>
                </div>
                <div className="text-accent-custom mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">
                  "Mentoring through AspireLink has been incredibly rewarding.
                  Seeing my mentee grow and succeed reminds me why I love what I
                  do."
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-custom to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-charcoal-custom">
                      Aisha Patel
                    </h4>
                    <p className="text-sm text-gray-500">Business Student</p>
                  </div>
                </div>
                <div className="text-accent-custom mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">
                  "The networking opportunities and industry insights I gained
                  were invaluable. AspireLink opened doors I didn't even know
                  existed."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-custom text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students and professionals who have accelerated
            their careers through meaningful mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/students">
              <Button className="bg-white text-primary-custom hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg">
                Apply as Student
              </Button>
            </Link>
            <Link href="/mentors">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-custom px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Become a Mentor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
