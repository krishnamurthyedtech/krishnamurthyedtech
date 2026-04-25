import React, { useState, useEffect } from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import AssessmentRequestPopup from '../components/AssessmentRequestPopup';
import TechnicalConsultingPopup from '../components/TechnicalConsultingPopup';
import NextGenAIPartnershipPopup from '../components/NextGenAIPartnershipPopup';
import ResumeBuildingPopup from '../components/ResumeBuildingPopup';
import NextGenAIEngineerFellowshipPopup from '../components/NextGenAIEngineerFellowshipPopup';
import MentorshipProgramsPopup from '../components/MentorshipProgramsPopup';
import { Settings, Puzzle, BarChart3, FileText, ChevronRight, GraduationCap, Compass, ChevronDown, CheckCircle, Target, Users, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

// Type definitions
interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

interface ServiceCards {
  'Technical Consulting': ServiceCard[];
  'NextGen AI Partnership': ServiceCard[];
  'Skill Assessments': ServiceCard[];
  'Professional Resume Building': ServiceCard[];
  'NextGen AI Engineer Fellowship': ServiceCard[];
  'Mentorship Programs': ServiceCard[];
  [key: string]: ServiceCard[];
}

interface CardIndexState {
  [key: string]: number;
}

interface HoveredState {
  [key: string]: boolean;
}

// Add CSS for card rotation animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

const Services: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState<CardIndexState>({});
  const [isHovered, setIsHovered] = useState<HoveredState>({});
  const [isAssessmentPopupOpen, setIsAssessmentPopupOpen] = useState(false);
  const [isTechnicalConsultingPopupOpen, setIsTechnicalConsultingPopupOpen] = useState(false);
  const [isNextGenAIPartnershipPopupOpen, setIsNextGenAIPartnershipPopupOpen] = useState(false);
  const [isResumeBuildingPopupOpen, setIsResumeBuildingPopupOpen] = useState(false);
  const [isNextGenAIEngineerFellowshipPopupOpen, setIsNextGenAIEngineerFellowshipPopupOpen] = useState(false);
  const [isMentorshipProgramsPopupOpen, setIsMentorshipProgramsPopupOpen] = useState(false);

  const serviceCards: ServiceCards = {
    'Technical Consulting': [
      {
        icon: <Settings className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
        title: "Architecture Audit",
        description: "In-depth analysis of existing systems and design of scalable, robust architectures",
        features: [
          "System Architecture Review",
          "Scalability Assessment",
          "Security Audit",
          "Performance Optimization"
        ]
      },
      {
        icon: <Puzzle className="w-12 h-12 text-purple-500 mx-auto mb-4" />,
        title: "Scalability Strategy",
        description: "Strategic planning for growth and handling increased load effectively",
        features: [
          "Load Balancing Design",
          "Database Scaling",
          "Microservices Architecture",
          "Cloud Migration Planning"
        ]
      },
      {
        icon: <BarChart3 className="w-12 h-12 text-pink-500 mx-auto mb-4" />,
        title: "DevOps Implementation",
        description: "Establishing efficient development pipelines and operational practices",
        features: [
          "CI/CD Pipeline Setup",
          "Infrastructure as Code",
          "Monitoring Solutions",
          "Automation Strategies"
        ]
      }
    ],
    'NextGen AI Partnership': [
      {
        icon: <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />,
        title: "AI Strategy Consulting",
        description: "Strategic guidance to identify AI opportunities and develop implementation roadmaps",
        features: [
          "AI Opportunity Assessment",
          "Implementation Roadmap",
          "ROI Analysis",
          "Technology Selection"
        ]
      },
      {
        icon: <Code className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
        title: "Custom AI Solutions",
        description: "Tailored AI applications designed to solve specific business challenges",
        features: [
          "Machine Learning Models",
          "Natural Language Processing",
          "Computer Vision Systems",
          "Predictive Analytics"
        ]
      },
      {
        icon: <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />,
        title: "AI-Powered Automation",
        description: "Intelligent automation solutions to streamline operations and reduce costs",
        features: [
          "Process Automation",
          "Intelligent Workflows",
          "Decision Support Systems",
          "Continuous Learning"
        ]
      }
    ],
    'Skill Assessments': [
      {
        icon: <BarChart3 className="w-12 h-12 text-pink-500 mx-auto mb-4" />,
        title: "Technical Proficiency Benchmarking",
        description: "Comprehensive evaluation of technical skills across multiple domains",
        features: [
          "Programming Language Assessment",
          "Framework & Library Proficiency",
          "System Design Capabilities",
          "Code Quality Analysis"
        ]
      },
      {
        icon: <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />,
        title: "Project-Based Evaluation",
        description: "Real-world project assessments to measure practical capabilities",
        features: [
          "Live Coding Challenges",
          "Architecture Design Tasks",
          "Problem-Solving Scenarios",
          "Collaborative Coding Tests"
        ]
      },
      {
        icon: <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />,
        title: "Hiring Process Optimization",
        description: "Streamline technical hiring with data-driven assessment frameworks",
        features: [
          "Custom Assessment Design",
          "Candidate Skill Mapping",
          "Team Fit Analysis",
          "Performance Prediction Models"
        ]
      }
    ],
    'Professional Resume Building': [
      {
        icon: <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />,
        title: "ATS-Optimized Formatting",
        description: "Resume formatting designed to pass automated tracking systems",
        features: [
          "Keyword Optimization",
          "Structure & Layout Design",
          "Industry-Specific Templates",
          "Machine-Readable Formatting"
        ]
      },
      {
        icon: <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />,
        title: "Achievement-Focused Content",
        description: "Highlight your accomplishments and impact in measurable terms",
        features: [
          "Quantifiable Results",
          "Project Impact Statements",
          "Leadership & Initiative Display",
          "Technical Achievement Highlighting"
        ]
      },
      {
        icon: <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
        title: "Industry-Specific Tailoring",
        description: "Customized resumes for different tech roles and industries",
        features: [
          "Role-Specific Customization",
          "Industry Keyword Integration",
          "Company Culture Alignment",
          "Career Level Optimization"
        ]
      }
    ],
    'NextGen AI Engineer Fellowship': [
      {
        icon: <GraduationCap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />,
        title: "AI Model Training",
        description: "Hands-on experience training and deploying production-grade AI models",
        features: [
          "Deep Learning Frameworks",
          "Model Architecture Design",
          "Training Pipeline Setup",
          "Model Deployment & Monitoring"
        ]
      },
      {
        icon: <Code className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
        title: "AI Research Projects",
        description: "Work on cutting-edge AI research projects with industry experts",
        features: [
          "Research Paper Implementation",
          "Novel Algorithm Development",
          "Dataset Curation",
          "Experimentation & Analysis"
        ]
      },
      {
        icon: <Settings className="w-12 h-12 text-purple-500 mx-auto mb-4" />,
        title: "AI Infrastructure",
        description: "Master the tools and infrastructure for scalable AI systems",
        features: [
          "MLOps Pipelines",
          "GPU Clusters & Cloud",
          "Model Versioning",
          "Scalable Inference Systems"
        ]
      }
    ],
    'Mentorship Programs': [
      {
        icon: <Compass className="w-12 h-12 text-indigo-500 mx-auto mb-4" />,
        title: "1-on-1 Career Coaching",
        description: "Personalized guidance from industry veterans for your career growth",
        features: [
          "Career Path Planning",
          "Skill Gap Analysis",
          "Goal Setting & Tracking",
          "Regular Progress Reviews"
        ]
      },
      {
        icon: <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />,
        title: "Technical Interview Prep",
        description: "Comprehensive preparation for technical interviews at top companies",
        features: [
          "Mock Technical Interviews",
          "System Design Practice",
          "Algorithm & Data Structures",
          "Behavioral Interview Training"
        ]
      },
      {
        icon: <BarChart3 className="w-12 h-12 text-pink-500 mx-auto mb-4" />,
        title: "Long-term Career Strategy",
        description: "Strategic planning for sustained career growth and advancement",
        features: [
          "Industry Trend Analysis",
          "Skill Roadmap Development",
          "Leadership Transition Planning",
          "Network Building Strategies"
        ]
      }
    ]
  };

  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};
    
    Object.keys(serviceCards).forEach(serviceTitle => {
      if (!isHovered[serviceTitle]) {
        intervals[serviceTitle] = setInterval(() => {
          setCurrentCardIndex(prev => ({
            ...prev,
            [serviceTitle]: ((prev[serviceTitle] || 0) + 1) % serviceCards[serviceTitle].length
          }));
        }, 3000);
      }
    });

    return () => {
      Object.values(intervals).forEach((intervalId: NodeJS.Timeout) => clearInterval(intervalId));
    };
  }, [isHovered, serviceCards]);

  const services = [
    {
      icon: <Settings className="w-10 h-10 text-blue-500" />,
      title: "Technical Consulting",
      description: "Strategic guidance for digital transformation, cloud architecture migration, and technology stack optimization. We help you make engineering decisions that scale.",
      details: ["Architecture Audit", "Scalability Strategy", "DevOps Implementation", "Tech Stack Modernization"]
    },
    {
      icon: <Puzzle className="w-10 h-10 text-purple-500" />,
      title: "NextGen AI Partnership",
      description: "Strategic AI partnerships that transform your business with cutting-edge artificial intelligence solutions. We help you leverage AI to drive innovation and competitive advantage.",
      details: ["AI Strategy Consulting", "Custom AI Solutions", "Machine Learning Integration", "AI-Powered Automation"]
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-pink-500" />,
      title: "Skill Assessments",
      description: "Rigorous evaluation frameworks to measure the true engineering capability of your current or potential team members. Stop guessing about technical talent.",
      details: ["Technical Proficiency Benchmarking", "Project-Based Evaluation", "Gap Analysis Reporting", "Hiring Process Optimization"]
    },
    {
      icon: <FileText className="w-10 h-10 text-green-500" />,
      title: "Professional Resume Building",
      description: "Expert-crafted resumes that highlight your technical expertise and achievements. Transform your career narrative with industry-standard formatting and compelling content.",
      details: ["ATS-Optimized Formatting", "Keyword Optimization", "Achievement-Focused Content", "Industry-Specific Tailoring"]
    },
    {
      icon: <GraduationCap className="w-10 h-10 text-yellow-500" />,
      title: "NextGen AI Engineer Fellowship",
      description: "Transform into an AI engineer through our intensive fellowship program. Gain hands-on experience with cutting-edge AI technologies and real-world projects.",
      details: ["AI Model Training", "AI Research Projects", "AI Infrastructure", "Career Placement"]
    },
    {
      icon: <Compass className="w-10 h-10 text-indigo-500" />,
      title: "Mentorship Programs",
      description: "Get personalized guidance from industry veterans. Navigate your career path with insights from professionals who have built systems at scale.",
      details: ["1-on-1 Career Coaching", "Technical Interview Prep", "System Design Reviews", "Long-term Career Strategy"]
    }
  ];

  return (
    <div className="pt-24">
      <Section containerClassName="max-w-4xl text-center mb-16">
        <h1 className="text-5xl font-heading font-bold mb-6">Expertise at Your Service</h1>
        <p className="text-slate-400 text-lg">
          Beyond building engineers, we help organizations build better software and smarter teams through specialized consulting and evaluation services.
        </p>
      </Section>

      <Section>
        <div className="space-y-12">
          {services.map((service, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-12 items-start ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 space-y-6">
                <div className="p-4 bg-white/5 rounded-2xl w-fit">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold">{service.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-sm text-slate-300">
                      <ChevronRight size={16} className="text-blue-500" />
                      {detail}
                    </div>
                  ))}
                </div>
                {service.title === 'Skill Assessments' ? (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsAssessmentPopupOpen(true)}
                    className="mt-4"
                  >
                    Request {service.title}
                  </Button>
                ) : service.title === 'Technical Consulting' ? (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsTechnicalConsultingPopupOpen(true)}
                    className="mt-4"
                  >
                    Request {service.title}
                  </Button>
                ) : service.title === 'NextGen AI Partnership' ? (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsNextGenAIPartnershipPopupOpen(true)}
                    className="mt-4"
                  >
                    Request {service.title}
                  </Button>
                ) : service.title === 'Professional Resume Building' ? (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsResumeBuildingPopupOpen(true)}
                    className="mt-4"
                  >
                    Request {service.title}
                  </Button>
                ) : service.title === 'NextGen AI Engineer Fellowship' ? (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsNextGenAIEngineerFellowshipPopupOpen(true)}
                    className="mt-4"
                  >
                    Request {service.title}
                  </Button>
                ) : service.title === 'Mentorship Programs' ? (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsMentorshipProgramsPopupOpen(true)}
                    className="mt-4"
                  >
                    Request {service.title}
                  </Button>
                ) : (
                  <Link to="/contact" className="inline-block mt-4">
                    <Button variant="outline" size="lg">Request {service.title}</Button>
                  </Link>
                )}
              </div>
              <div className="flex-1 w-full">
                <div 
                  className="relative h-80 flex items-center justify-center"
                  onMouseEnter={() => setIsHovered(prev => ({ ...prev, [service.title]: true }))}
                  onMouseLeave={() => setIsHovered(prev => ({ ...prev, [service.title]: false }))}
                >
                  <div className="relative w-[400px] h-[200px] overflow-hidden">
                    <div className="relative h-full flex items-center justify-center">
                      {serviceCards[service.title]?.map((card: ServiceCard, index: number) => {
                        const currentIndex = currentCardIndex[service.title] || 0;
                        const totalCards = serviceCards[service.title].length;
                        
                        // Calculate position based on current index
                        let position = index - currentIndex;
                        if (position < -1) position += totalCards;
                        if (position > 1) position -= totalCards;
                        
                        // Determine transform and opacity based on position
                        let transform = '';
                        let opacity = 0;
                        let zIndex = 1;
                        
                        if (position === 0) {
                          // Center card - fully visible
                          transform = 'translateX(0) scale(1)';
                          opacity = 1;
                          zIndex = 10;
                        } else if (position === -1) {
                          // Left card - coming from background
                          transform = 'translateX(-120px) scale(0.8)';
                          opacity = 0.3;
                          zIndex = 5;
                        } else if (position === 1) {
                          // Right card - going to background
                          transform = 'translateX(120px) scale(0.8)';
                          opacity = 0.3;
                          zIndex = 5;
                        }
                        
                        return (
                          <div
                            key={index}
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-3000 ease-in-out`}
                            style={{
                              transform,
                              opacity,
                              zIndex,
                              pointerEvents: position === 0 ? 'auto' : 'none'
                            }}
                          >
                            <Card className={`p-4 text-center transition-all duration-300 group hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.25)] hover:border-blue-500 hover:bg-[#101a2c] hover:scale-105 w-[280px] ${
                              index === 0 ? 'bg-blue-600/10 border-blue-500/20' :
                              index === 1 ? 'bg-black border-purple-500/20' :
                              'bg-black border-green-500/20'
                            }`}>
                              <div className="mb-3">
                                {card.icon}
                              </div>
                              <h4 className="font-bold text-white text-sm">{card.title}</h4>
                              <p className="text-xs text-slate-400 mt-2">{card.description}</p>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Carousel indicators */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {serviceCards[service.title]?.map((_: ServiceCard, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCardIndex(prev => ({ ...prev, [service.title]: index }))}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === (currentCardIndex[service.title] || 0)
                            ? 'bg-blue-500 w-8'
                            : 'bg-white/30 hover:bg-white/50 text-black'
                        }`}
                        aria-label={`Go to card ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-black/50 text-center py-20">
        <Card className="max-w-3xl mx-auto py-12 px-8">
          <h3 className="text-2xl font-bold mb-4">Ready to elevate your engineering standards?</h3>
          <p className="text-slate-400 mb-8">
            Consult with our specialists to find the right talent solution for your organization.
          </p>
          <Link to="/contact">
            <Button size="lg">Message for more Information</Button>
          </Link>
        </Card>
      </Section>

      {/* Service-Specific Popups */}
      <AssessmentRequestPopup 
        isOpen={isAssessmentPopupOpen}
        onClose={() => setIsAssessmentPopupOpen(false)}
      />
      
      <TechnicalConsultingPopup 
        isOpen={isTechnicalConsultingPopupOpen}
        onClose={() => setIsTechnicalConsultingPopupOpen(false)}
      />
      
      <NextGenAIPartnershipPopup 
        isOpen={isNextGenAIPartnershipPopupOpen}
        onClose={() => setIsNextGenAIPartnershipPopupOpen(false)}
      />
      
      <ResumeBuildingPopup 
        isOpen={isResumeBuildingPopupOpen}
        onClose={() => setIsResumeBuildingPopupOpen(false)}
      />
      
      <NextGenAIEngineerFellowshipPopup 
        isOpen={isNextGenAIEngineerFellowshipPopupOpen}
        onClose={() => setIsNextGenAIEngineerFellowshipPopupOpen(false)}
      />
      
      <MentorshipProgramsPopup 
        isOpen={isMentorshipProgramsPopupOpen}
        onClose={() => setIsMentorshipProgramsPopupOpen(false)}
      />
    </div>
  );
};

export default Services;