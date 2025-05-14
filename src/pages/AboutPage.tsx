import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heart, Calendar, MessageSquare, Clock, Brain, ShieldCheck, ArrowRight } from 'lucide-react';
import { teamMembers, services } from '@/data/mockData';
import { ContactFormData } from '@/types';
import { toast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function AboutPage() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  const onSubmit = (data: ContactFormData) => {
    // In a real app, this would send the form data
    console.log('Form submitted:', data);
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    });
    form.reset();
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Making Healthcare <span className="text-medical-green-light">Accessible</span> for Everyone
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl">
              Our mission is to bridge the gap between medical knowledge and everyday health decisions through innovative technology.
            </p>
            <Button asChild size="lg" className="bg-medical-green hover:bg-medical-green-dark text-white">
              <a href="#services">
                Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/7088474/pexels-photo-7088474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Medical professionals discussing"
                className="rounded-lg shadow-lg w-full"
                onError={e => { e.currentTarget.src = 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'; }}
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                CareWill began with a simple idea: make medical information more accessible to everyone. Founded in 2023 by a team of healthcare professionals and AI specialists, we've built a platform that combines advanced technology with medical expertise.
              </p>
              <p className="text-lg text-muted-foreground">
                We understand that navigating healthcare can be complex and overwhelming. That's why we've created tools that simplify the process, from answering basic health questions to finding the right doctor near you.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-sm text-muted-foreground">Users Helped</div>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Doctors Network</div>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">AI Assistance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              From AI-powered health assessments to doctor locator tools, we offer a range of services designed to make healthcare more accessible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover-lift">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {service.icon === 'brain-circuit' && <Brain className="h-6 w-6 text-primary" />}
                    {service.icon === 'calendar' && <Calendar className="h-6 w-6 text-primary" />}
                    {service.icon === 'pill' && <Clock className="h-6 w-6 text-primary" />}
                    {service.icon === 'file-text' && <ShieldCheck className="h-6 w-6 text-primary" />}
                    {service.icon === 'video' && <MessageSquare className="h-6 w-6 text-primary" />}
                    {service.icon === 'heart-pulse' && <Heart className="h-6 w-6 text-primary" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the experts behind CareWill who ensure our platform provides accurate, helpful health information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="hover-lift text-center">
                <CardContent className="pt-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <img src={member.image} alt={member.name} className="object-cover" />
                  </Avatar>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-medical-green mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions about our services? Want to provide feedback? We'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email Us</h3>
                    <p className="text-muted-foreground mb-1">For general inquiries:</p>
                    <a href="mailto:info@carewill.com" className="text-primary hover:underline">
                      info@carewill.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9am - 5pm EST</p>
                    <p className="text-muted-foreground">Saturday: 10am - 2pm EST</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Message subject" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your message" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}