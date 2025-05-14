import { ChatInterface } from '@/components/chat/ChatInterface';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, MapPin, BookOpen, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-medical-blue to-medical-blue-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Healthcare Guidance <br />
                <span className="text-medical-green-light">At Your Fingertips</span>
              </h1>
              <p className="text-lg opacity-90 max-w-md">
                Get instant responses to your health questions, find doctors near you, and access valuable medical resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-medical-green hover:bg-medical-green-dark">
                  <a href="#chat-section">
                    Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="customGreenOutline" size="lg" className="bg-white text-medical-green border-medical-green shadow-md hover:bg-medical-green hover:text-white hover:shadow-lg transition-colors">
                  <Link to="/doctors">
                    Find Doctors <MapPin className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img
                src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Doctor with digital tablet"
                className="rounded-lg shadow-xl object-cover h-[400px] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-medical-green flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Trusted by Patients</p>
                    <p className="text-sm text-muted-foreground">4.9/5 from 2,000+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground">
              Everything you need for better health management in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm hover-lift">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">AI-Powered Chat</h3>
              <p className="text-muted-foreground mb-4">
                Get instant answers to your health questions from our advanced medical assistant.
              </p>
              <Button asChild variant="link" className="p-0">
                <a href="#chat-section">
                  Try Now <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm hover-lift">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Doctor Locator</h3>
              <p className="text-muted-foreground mb-4">
                Find healthcare professionals near you with our interactive map and filtering options.
              </p>
              <Button asChild variant="link" className="p-0">
                <Link to="/doctors">
                  Find Doctors <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm hover-lift">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Medical Resources</h3>
              <p className="text-muted-foreground mb-4">
                Access a curated collection of research papers, guides, and forms for better health understanding.
              </p>
              <Button asChild variant="link" className="p-0">
                <Link to="/resources">
                  Explore Resources <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Chat Section */}
      <section id="chat-section" className="w-full py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Chat with our Medical Assistant</h2>
            <p className="text-muted-foreground">
              Ask questions about symptoms, treatments, or general health advice
            </p>
          </div>
          
          <ChatInterface />
          
          <div className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            <p>
              <strong>Note:</strong> This AI assistant provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Explore our services and start your journey to better health management today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-medical-green hover:bg-medical-green-dark text-white">
              <Link to="/about">
                <Users className="mr-2 h-4 w-4" /> Learn About Us
              </Link>
            </Button>
            <Button asChild variant="customGreen" size="lg" className="bg-medical-green hover:bg-medical-green-dark text-white shadow-md hover:shadow-lg transition-colors">
              <Link to="/doctors">
                <MapPin className="mr-2 h-4 w-4" /> Find Doctors
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}