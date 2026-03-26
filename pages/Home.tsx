import React from 'react';
import { ArrowRight, Code, Users, Zap, Search, ShieldCheck, CheckCircle2, Globe, Cpu, Sparkles, Layers, Box } from 'lucide-react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Elite Architectural Style */}
      <Section className="relative pt-32 pb-12" containerClassName="text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-blue-600/10 rounded-full blur-[140px] -z-10" />
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold mb-10 tracking-tighter leading-[0.85] text-white">
          Architecting the <br />
          <span className="text-gradient">Elite Engineer</span>.
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-medium">
          KMEdTech is a world-class Talent Engineering Platform. We forge the bridge between academic theory and enterprise-grade performance through rigorous project validation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/contact">
            <Button size="lg" variant="primary" className="px-12 h-16 text-lg rounded-2xl">Get Started Now</Button>
          </Link>
          <Link to="/products">
            <Button size="lg" variant="outline" className="px-12 h-16 text-lg rounded-2xl">Explore Ecosystem</Button>
          </Link>
        </div>
      </Section>

      {/* The Ecosystem - Refined Flagship Cards */}
      <Section className="bg-transparent relative pt-8" id="ecosystem">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white tracking-tight">The Talent Ecosystem</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            High-precision platforms engineered to surface, validate, and scale technical excellence across the global industry.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Flagship Product 1: pioneercoders.net */}
          <div className="flex justify-center items-center w-full" style={{ minHeight: '60vh' }}>
             <Card className="max-w-3xl w-full relative overflow-hidden flex flex-col p-6 md:p-8 border-white/10 bg-[#080808] transition-all duration-500 group hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.25)] hover:border-blue-500 hover:bg-[#101a2c]">
                <div className="flex justify-between items-start mb-8">
                   <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                      <Cpu size={28} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/50">Ecosystem</span>
                </div>

                <div className="relative z-10 flex-grow">
                   <h3 className="text-4xl font-bold text-white mb-5">Pioneer LnD Hub</h3>
                   <p className="text-xl text-slate-300 leading-relaxed mb-8">
                      Pioneer L&D Hub is a modern digital learning platform offering structured IT training, expert-led video tutorials, real-world project experience, career support, and engaging activities to boost technical expertise and industry readiness.
                   </p>
                   
                   <ul className="space-y-4 mb-8">
                      {['Structured IT training programs', 'Expert-led video tutorials', 'Real-world project experience', 'Career support and guidance', 'Quizzes and hackathons for skill enhancement'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-400 font-medium">
                          <CheckCircle2 size={18} className="text-blue-500" />
                          {item}
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="pt-6 border-t border-white/5">
                   <a href="https://pioneerlndhub.com/" target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-3 text-white text-lg font-bold transition-all">
                      Learn the craft <ArrowRight size={22} className="group-hover/link:translate-x-2 transition-transform text-blue-500" />
                   </a>
                </div>

                {/* Background Visual Detail */}
                <div className="absolute -right-16 -bottom-16 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                   <Code size={200} />
                </div>
                {/* Glow effect overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 80px 20px rgba(59,130,246,0.25)' }}></div>
             </Card>
          </div>

          {false && (
          <div className="group relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-700"></div>
             <Card className="h-full relative overflow-hidden flex flex-col p-10 border-white/10 bg-[#080808] hover:border-purple-500/30 transition-all duration-500">
                <div className="flex justify-between items-start mb-12">
                   <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                      <Users size={28} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500/50">Ecosystem Path 02</span>
                </div>

                <div className="relative z-10 flex-grow">
                   <h3 className="text-4xl font-bold text-white mb-5">HiringHub</h3>
                   <p className="text-xl text-slate-300 leading-relaxed mb-8">
                      Bypass traditional interviewing. Connect directly with pre-validated talent through deep performance metrics.
                   </p>
                   <ul className="space-y-4 mb-10">
                      {['Skills-Based Engineering Search', 'Verified Code Quality Scores', 'Direct Pipeline to Elite Talent'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-400 font-medium">
                          <CheckCircle2 size={18} className="text-purple-500" />
                          {item}
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="pt-8 border-t border-white/5">
                   <Link to="/products" className="group/link inline-flex items-center gap-3 text-white text-lg font-bold transition-all">
                      Access Talent Pool <ArrowRight size={22} className="group-hover/link:translate-x-2 transition-transform text-purple-500" />
                   </Link>
                </div>

                {/* Background Visual Detail */}
                <div className="absolute -right-16 -bottom-16 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                   <Globe size={300} />
                </div>
             </Card>
          </div>
          )}
        </div>
      </Section>

      {/* Philosophy Section - Minimalist & High Impact */}
      <Section className="py-24">
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-blue-500/10 select-none">
            <Sparkles size={100} />
          </div>
          <h2 className="text-sm uppercase tracking-[0.5em] text-blue-500 font-black mb-12 relative z-10">THE CORE PHILOSOPHY</h2>
          <blockquote className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium text-white leading-[1.15] tracking-tight relative z-10">
            "The world doesn't need more people who can write code. It needs more <span className="text-gradient">talented engineers</span> who architect resilient futures."
          </blockquote>
          <div className="mt-12 flex flex-col items-center">
             <div className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
             <p className="mt-8 text-slate-500 font-bold tracking-[0.3em] uppercase text-[10px]">A KMEdTech Global Standard</p>
          </div>
        </div>
      </Section>

      {/* Final CTA - Immersive Full Width */}
      <div className="px-6 md:px-12 pb-16">
        <div className="relative rounded-[3.5rem] overflow-hidden bg-[#050505] border border-white/10 group shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.12),transparent)] opacity-100 group-hover:opacity-150 transition-opacity duration-1000"></div>
          
          <div className="relative py-24 px-10 md:px-20 flex flex-col lg:flex-row items-center justify-between text-left gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 tracking-tighter leading-none">
                Ready to <span className="text-gradient">Architect</span> Your Future?
              </h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
                Join the league of elite talent or build your core team with industry-validated expertise.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full lg:w-auto">
               <Link to="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto px-12 h-16 rounded-[1.5rem] text-lg font-bold">
                    Get Started
                  </Button>
               </Link>
               <Link to="/about" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-12 h-16 rounded-[1.5rem] text-lg font-bold">
                    Our Story
                  </Button>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
