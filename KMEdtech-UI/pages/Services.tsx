
import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Settings, Puzzle, BarChart3, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Settings className="w-10 h-10 text-blue-500" />,
      title: "Technical Consulting",
      description: "Strategic guidance for digital transformation, cloud architecture migration, and technology stack optimization. We help you make engineering decisions that scale.",
      details: ["Architecture Audit", "Scalability Strategy", "DevOps Implementation", "Tech Stack Modernization"]
    },
    {
      icon: <Puzzle className="w-10 h-10 text-purple-500" />,
      title: "Engineering Outsourcing",
      description: "High-quality, dedicated engineering squads that integrate seamlessly with your core team. We don't just provide 'hands'; we provide high-level engineering brains.",
      details: ["Managed Agile Squads", "Full-Stack Development", "Specialized Feature Teams", "Long-term Maintenance"]
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-pink-500" />,
      title: "Skill Assessments",
      description: "Rigorous evaluation frameworks to measure the true engineering capability of your current or potential team members. Stop guessing about technical talent.",
      details: ["Technical Proficiency Benchmarking", "Project-Based Evaluation", "Gap Analysis Reporting", "Hiring Process Optimization"]
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
                <Link to="/contact" className="inline-block pt-4">
                  <Button variant="outline">Learn More about {service.title}</Button>
                </Link>
              </div>
              <div className="flex-1 w-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl h-80 flex items-center justify-center overflow-hidden">
                 <div className="w-2/3 h-2/3 border border-white/10 rounded-xl relative opacity-30">
                    <div className="absolute top-0 left-0 w-full h-2 bg-white/20" />
                    <div className="absolute bottom-4 left-4 right-4 h-1/2 border border-white/20 rounded-lg p-4">
                      <div className="w-1/2 h-2 bg-white/20 mb-2" />
                      <div className="w-3/4 h-2 bg-white/20" />
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-brand-dark/50 text-center py-20">
        <Card className="max-w-3xl mx-auto py-12 px-8">
          <h3 className="text-2xl font-bold mb-4">Ready to elevate your engineering standards?</h3>
          <p className="text-slate-400 mb-8">
            Consult with our specialists to find the right talent solution for your organization.
          </p>
          <Link to="/contact">
            <Button size="lg">Book a Technical Consultation</Button>
          </Link>
        </Card>
      </Section>
    </div>
  );
};

export default Services;
