import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { Settings, Users, Briefcase, Building2 } from 'lucide-react';

const clientData = [
  {
    id: 1,
    name: 'SMKR',
    description: 'A forward-thinking enterprise partnering with us to scale their technical operations and team capabilities.',
    services: [
      { name: 'Technical Support', icon: <Settings size={18} className="text-blue-500" /> },
      { name: 'Hiring Assistance', icon: <Users size={18} className="text-purple-500" /> },
      { name: 'Project Handling', icon: <Briefcase size={18} className="text-pink-500" /> },
    ],
    gradient: 'from-blue-600/20 to-blue-900/20',
    borderHover: 'hover:border-blue-500',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]'
  },
  {
    id: 2,
    name: 'RISINGSUN',
    description: 'Empowering their digital transformation through our comprehensive technical and hiring solutions.',
    services: [
      { name: 'Technical Support', icon: <Settings size={18} className="text-blue-500" /> },
      { name: 'Hiring Assistance', icon: <Users size={18} className="text-purple-500" /> },
      { name: 'Project Handling', icon: <Briefcase size={18} className="text-pink-500" /> },
    ],
    gradient: 'from-amber-600/20 to-amber-900/20',
    borderHover: 'hover:border-amber-500',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]'
  },
  {
    id: 3,
    name: 'ZOBNEST',
    description: 'Leveraging our expertise to build robust technical infrastructure and source top-tier engineering talent.',
    services: [
      { name: 'Technical Support', icon: <Settings size={18} className="text-blue-500" /> },
      { name: 'Hiring Assistance', icon: <Users size={18} className="text-purple-500" /> },
      { name: 'Project Handling', icon: <Briefcase size={18} className="text-pink-500" /> },
    ],
    gradient: 'from-green-600/20 to-green-900/20',
    borderHover: 'hover:border-green-500',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]'
  },
  {
    id: 4,
    name: 'ARGOCURST',
    description: 'Collaborating on complex engineering projects and streamlining their recruitment pipeline.',
    services: [
      { name: 'Technical Support', icon: <Settings size={18} className="text-blue-500" /> },
      { name: 'Hiring Assistance', icon: <Users size={18} className="text-purple-500" /> },
      { name: 'Project Handling', icon: <Briefcase size={18} className="text-pink-500" /> },
    ],
    gradient: 'from-purple-600/20 to-purple-900/20',
    borderHover: 'hover:border-purple-500',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
  }
];

const Clients: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <Section containerClassName="max-w-4xl text-center" className="pb-4 pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <Building2 size={16} className="text-blue-500" />
          <span className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Trusted Partners</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
          Empowering Our <span className="text-gradient">Clients</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          We provide enterprise-grade technical support, targeted hiring assistance, and comprehensive project handling to help organizations scale and succeed.
        </p>
      </Section>

      {/* Clients Grid */}
      <Section className="mb-20 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {clientData.map((client) => (
            <Card 
              key={client.id} 
              className={`p-8 relative overflow-hidden transition-all duration-500 group border border-white/10 bg-black/40 ${client.borderHover} ${client.shadowHover}`}
            >
              {/* Background Gradient Mesh */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${client.gradient} blur-[50px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <span className="font-heading font-bold text-xl text-white tracking-wider">{client.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">{client.name}</h3>
                </div>
                
                <p className="text-slate-400 mb-8 flex-grow">
                  {client.description}
                </p>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 border-b border-white/5 pb-2">Services Provided</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {client.services.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5 transition-colors hover:bg-white/10">
                        <div className="p-2 bg-black/50 rounded-lg">
                          {service.icon}
                        </div>
                        <span className="text-slate-200 font-medium">{service.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-gradient-to-b from-black/0 to-blue-900/10 border-t border-white/5 text-center py-24">
        <Card className="max-w-3xl mx-auto py-12 px-6 md:px-12 bg-black/60 backdrop-blur-xl border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-heading font-bold mb-4 text-white">Ready to join our network?</h3>
            <p className="text-slate-400 mb-8 text-lg">
              Let us handle your technical challenges and hiring needs so you can focus on scaling your business.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="primary" className="font-bold tracking-wide rounded-full px-8">
                Partner With Us
              </Button>
            </Link>
          </div>
        </Card>
      </Section>
    </div>
  );
};

export default Clients;
