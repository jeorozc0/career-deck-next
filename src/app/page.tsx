import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Star, Zap, FileText, Briefcase, ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold">ResumeAI</a>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/profile" className="text-muted-foreground hover:text-foreground">Profile</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
              <li><Link href={"/login"} ><Button variant="outline" size="sm">Log In</Button></Link></li>
              <li><Link href={"/register"} ><Button variant="outline" size="sm">Sign Up</Button></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Transform Your Job Search with AI-Powered Resumes
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Create stunning, ATS-friendly resumes and track your job applications effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto">Create Resume</Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">Try Free</Button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="Resume Builder Illustration"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Powerful Features at Your Fingertips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="w-8 h-8 mb-4 text-primary" />, title: "AI-Powered Resume Builder", description: "Create professional resumes with the help of advanced AI technology." },
              { icon: <FileText className="w-8 h-8 mb-4 text-primary" />, title: "Multiple Resume Versions", description: "Tailor your resume for different roles and opportunities." },
              { icon: <Star className="w-8 h-8 mb-4 text-primary" />, title: "Professional Templates", description: "Choose from a variety of ATS-friendly, modern templates." },
              { icon: <CheckCircle2 className="w-8 h-8 mb-4 text-primary" />, title: "Real-time Editing & Preview", description: "See changes instantly as you craft your perfect resume." },
              { icon: <Briefcase className="w-8 h-8 mb-4 text-primary" />, title: "Job Application Tracking", description: "Manage your job applications efficiently (Coming Soon)." },
              { icon: <ArrowRight className="w-8 h-8 mb-4 text-primary" />, title: "Interview Scheduling", description: "Keep track of your interviews and deadlines (Premium Feature)." },
            ].map((feature, index) => (
              <Card key={index} className="bg-card-foreground/5">
                <CardContent className="p-6">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {[
              { step: 1, title: "Choose a Template", description: "Select from our professionally designed templates." },
              { step: 2, title: "Fill in Your Details", description: "Input your information or import from LinkedIn." },
              { step: 3, title: "Customize with AI", description: "Let our AI enhance your resume content." },
              { step: 4, title: "Download & Apply", description: "Get your polished resume and start applying!" },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Image
              src="/placeholder.svg?height=300&width=800"
              alt="Application Interface"
              width={800}
              height={300}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Trusted by Job Seekers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Software Engineer", quote: "This tool helped me land my dream job!" },
              { name: "Sarah Lee", role: "Marketing Specialist", quote: "The AI suggestions were spot-on. Highly recommend!" },
              { name: "Michael Chen", role: "Data Analyst", quote: "Easy to use and incredibly effective. 5 stars!" },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-card-foreground/5">
                <CardContent className="p-6">
                  <p className="mb-4 italic">"{testimonial.quote}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-2xl font-bold mb-4">Join 10,000+ successful job seekers</p>
            <p className="text-muted-foreground">Our users report a 40% increase in interview invitations</p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Choose Your Plan</h2>
          <div className="flex flex-col lg:flex-row justify-center gap-8">
            {[
              {
                title: "Free",
                price: "$0",
                features: [
                  "Basic resume builder",
                  "3 templates",
                  "Export to PDF",
                  "Track up to 10 job applications",
                ],
                cta: "Get Started",
                popular: false,
              },
              {
                title: "Premium",
                price: "$12.99",
                period: "/month",
                features: [
                  "Advanced AI-powered resume builder",
                  "Unlimited templates",
                  "Export to multiple formats",
                  "Unlimited job application tracking",
                  "Interview scheduling",
                  "Priority support",
                ],
                cta: "Try Free for 7 Days",
                popular: true,
              },
            ].map((plan, index) => (
              <Card key={index} className={`w-full lg:w-96 ${plan.popular ? 'border-primary' : ''}`}>
                <CardContent className="p-6">
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>{plan.cta}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-xl mb-8">Create your professional resume today and start your journey to success.</p>
          <Button size="lg" variant="secondary">Get Started Free</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2023 ResumeAI. All rights reserved.</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
