
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search, ChevronDown, ChevronRight, ExternalLink, HelpCircle, Book, MessageCircle, Bug } from "lucide-react";

const HelpScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Book,
      description: "Setup and onboarding help"
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: Bug,
      description: "Fix common issues"
    },
    {
      id: "features",
      title: "Features",
      icon: HelpCircle,
      description: "How to use app features"
    },
    {
      id: "support",
      title: "Contact Support",
      icon: MessageCircle,
      description: "Get personalized help"
    }
  ];

  const faqData = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I add my first garden plot?",
      answer: "To add your first plot, tap the '+' button on the home screen and follow the setup wizard. You'll need to provide your plot name, crop type, and location for optimal watering schedules."
    },
    {
      id: 2,
      category: "getting-started",
      question: "What crops are supported?",
      answer: "Miraqua supports over 50 common crops including vegetables, herbs, fruits, and flowers. Each crop has optimized watering schedules based on growth stage and weather conditions."
    },
    {
      id: 3,
      category: "troubleshooting",
      question: "Why isn't my schedule updating?",
      answer: "Schedule updates depend on weather data and AI optimization. If your schedule hasn't updated in 24 hours, check your internet connection and try refreshing the app."
    },
    {
      id: 4,
      category: "troubleshooting",
      question: "My sensors aren't connecting",
      answer: "Ensure your sensors are within Bluetooth range and have sufficient battery. Try resetting the sensor by holding the pairing button for 10 seconds."
    },
    {
      id: 5,
      category: "features",
      question: "How does AI optimization work?",
      answer: "Our AI analyzes weather forecasts, soil conditions, crop growth stages, and historical data to optimize watering schedules. It learns from your garden's performance over time."
    },
    {
      id: 6,
      category: "features",
      question: "Can I manually override the schedule?",
      answer: "Yes! You can water manually anytime using the 'Water Now' button. You can also adjust duration and skip scheduled waterings as needed."
    }
  ];

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setFaqs(faqData);
    } catch (err) {
      setError("Failed to load help content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFaqToggle = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "support") {
      // Navigate to contact form or external support
      window.open("mailto:support@miraqua.com", "_blank");
    } else {
      // Filter FAQs by category
      const categoryFaq = faqs.find(faq => faq.category === categoryId);
      if (categoryFaq) {
        setExpandedFaq(categoryFaq.id);
        // Scroll to FAQ section
        setTimeout(() => {
          const element = document.getElementById(`faq-${categoryFaq.id}`);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
            </div>
          </div>
        </header>
        
        <div className="px-6 py-6 space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
              <p className="text-sm text-gray-600">Find answers and get help</p>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-screen">
        <div className="px-6 py-6 pb-24 space-y-6">
          {/* Search Bar */}
          <div className="sticky top-0 z-30 bg-gray-50 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white"
              />
            </div>
          </div>

          {/* Quick Help Categories */}
          {!searchQuery && (
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.id}
                    className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                      <p className="text-xs text-gray-600">{category.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* FAQ Section */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">
                {searchQuery ? `Search Results (${filteredFaqs.length})` : 'Frequently Asked Questions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">{error}</p>
                  <Button onClick={loadFaqs} variant="outline">
                    Try Again
                  </Button>
                </div>
              ) : filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {searchQuery ? 'No results found' : 'No FAQs available'}
                  </p>
                  {searchQuery && (
                    <Button 
                      onClick={() => setSearchQuery("")}
                      variant="outline"
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      id={`faq-${faq.id}`}
                      className="border border-gray-200 rounded-lg"
                    >
                      <button
                        onClick={() => handleFaqToggle(faq.id)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* External Links */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">More Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Book className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">User Guide</p>
                    <p className="text-sm text-gray-600">Complete documentation</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
              
              <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Community Forum</p>
                    <p className="text-sm text-gray-600">Connect with other gardeners</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
              
              <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Bug className="w-5 h-5 text-red-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Report Bug</p>
                    <p className="text-sm text-gray-600">Help us improve the app</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Still Need Help?</h3>
              <p className="text-blue-100 mb-4">
                Our support team is here to help you get the most out of Miraqua
              </p>
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => window.open("mailto:support@miraqua.com", "_blank")}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HelpScreen;
