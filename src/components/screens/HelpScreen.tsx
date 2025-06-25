
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  MessageSquare, 
  Mail, 
  Phone,
  Book,
  HelpCircle,
  Send,
  ExternalLink
} from "lucide-react";

const HelpScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Book,
      questions: [
        {
          id: "setup",
          question: "How do I set up my first plot?",
          answer: "To set up your first plot, tap the '+' button on the home screen and follow the step-by-step wizard. You'll need to provide your plot name, location (ZIP code), crop type, planting date, and area details."
        },
        {
          id: "location",
          question: "Why do you need my location?",
          answer: "We use your location to provide accurate weather data, local growing conditions, and optimal watering schedules based on your climate zone."
        },
        {
          id: "crops",
          question: "What crops are supported?",
          answer: "Miraqua supports a wide variety of crops including tomatoes, herbs, lettuce, peppers, carrots, cucumbers, and many more. We're constantly adding new crop types based on user requests."
        }
      ]
    },
    {
      id: "watering",
      title: "Watering & Schedules",
      icon: MessageSquare,
      questions: [
        {
          id: "schedule",
          question: "How are watering schedules created?",
          answer: "Our AI analyzes your crop type, local weather, soil conditions, and plant growth stage to create personalized watering schedules that optimize water usage and plant health."
        },
        {
          id: "modify",
          question: "Can I modify the watering schedule?",
          answer: "Yes! You can manually adjust schedules, skip waterings, or add extra watering sessions. Use the 'Water Now' feature for immediate watering needs."
        },
        {
          id: "flexibility",
          question: "What is schedule flexibility?",
          answer: "Schedule flexibility allows you to choose how adaptable your watering times can be. Daily flexibility adjusts times within the same day, while weekly flexibility can move watering days within the week."
        }
      ]
    },
    {
      id: "monitoring",
      title: "Monitoring & Data",
      icon: HelpCircle,
      questions: [
        {
          id: "sensors",
          question: "Do I need special sensors?",
          answer: "No sensors are required to get started. Miraqua uses weather data and plant science to create schedules. However, you can connect compatible IoT sensors for even more precise monitoring."
        },
        {
          id: "data",
          question: "What data does Miraqua track?",
          answer: "We track moisture levels, temperature, sunlight exposure, watering history, plant growth stages, and weather patterns to provide comprehensive garden insights."
        },
        {
          id: "accuracy",
          question: "How accurate are the recommendations?",
          answer: "Our recommendations are based on agricultural science and real-time data, with 95%+ accuracy in optimal growing conditions. User feedback helps us continuously improve."
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: HelpCircle,
      questions: [
        {
          id: "notifications",
          question: "I'm not receiving notifications",
          answer: "Check your device notification settings and ensure Miraqua has permission to send notifications. You can also adjust notification preferences in the Account settings."
        },
        {
          id: "sync",
          question: "My data isn't syncing",
          answer: "Ensure you have a stable internet connection. If the problem persists, try signing out and back in. Contact support if issues continue."
        },
        {
          id: "performance",
          question: "The app is running slowly",
          answer: "Try closing and reopening the app. If performance issues persist, ensure you have the latest version installed and sufficient storage space on your device."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      contact: "support@miraqua.com",
      action: "Send Email"
    },
    {
      title: "Phone Support",
      description: "Speak with our team directly",
      icon: Phone,
      contact: "1-800-MIRAQUA",
      action: "Call Now"
    },
    {
      title: "Live Chat",
      description: "Chat with our AI assistant",
      icon: MessageSquare,
      contact: "Available 24/7",
      action: "Start Chat"
    }
  ];

  const handleFAQToggle = (questionId: string) => {
    setOpenFAQ(openFAQ === questionId ? null : questionId);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would submit to support system
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      searchQuery === "" || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Help & Support</h1>
            <div className="w-9"></div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-8">
        {/* Search */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-4">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-shadow">
                <CardContent className="p-4 text-center">
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{option.title}</h3>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          
          {filteredFAQs.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Icon className="w-5 h-5 mr-2 text-blue-600" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {category.questions.map((faq) => (
                    <Collapsible key={faq.id}>
                      <CollapsibleTrigger 
                        className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => handleFAQToggle(faq.id)}
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                          openFAQ === faq.id ? 'rotate-180' : ''
                        }`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 py-3 text-gray-700 text-sm leading-relaxed">
                        {faq.answer}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Form */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Contact Support</CardTitle>
            <p className="text-sm text-gray-600">Can't find what you're looking for? Send us a message.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Miraqua v1.0.0</h3>
              <p className="text-sm text-gray-600 mb-4">Smart irrigation for everyone</p>
            </div>
            
            <div className="flex justify-center space-x-6 text-sm">
              <button className="text-blue-600 hover:underline flex items-center">
                Privacy Policy
                <ExternalLink className="w-3 h-3 ml-1" />
              </button>
              <button className="text-blue-600 hover:underline flex items-center">
                Terms of Service
                <ExternalLink className="w-3 h-3 ml-1" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default HelpScreen;
