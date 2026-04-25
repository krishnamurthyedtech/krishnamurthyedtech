import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { CheckCircle2, Server, Layout, Database, Terminal, Sparkles, Briefcase, Users, Target } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <div className="pt-24">
      {/* LearningHub Section */}
      <Section className="relative">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase mb-6">
              <Terminal size={14} /> Ecosystem 
            </div>
            <h2 className="text-5xl font-heading font-extrabold mb-6 text-white drop-shadow-lg">LearningHub</h2>
            <p className="text-xl text-slate-500 mb-8 leading-relaxed">
              Not another course platform. LearningHub is a simulation of high-stakes engineering environments where learning happens through building, failing, and optimizing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Production Workflow Integration",
                "Advanced CI/CD Simulations",
                "Scalability Challenges",
                "Security-First Engineering",
                "System Architecture Design",
                "Real-time Mentor Reviews"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-blue-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-8">
              <Card className="bg-blue-600/10 border-blue-500/20 transition-all duration-300 group hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.25)] hover:border-blue-500 hover:bg-[#101a2c] hover:scale-105">
                <Layout className="text-blue-500 mb-4" />
                <h4 className="font-bold text-white">Frontend Engineering</h4>
                <p className="text-xs text-slate-400 mt-2">Design systems, performance, and accessibility.</p>
              </Card>
              <Card className="bg-black border-purple-500/20 transition-all duration-300 group hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.25)] hover:border-purple-500 hover:bg-[#1a102c] hover:scale-105">
                <Server className="text-purple-500 mb-4" />
                <h4 className="font-bold text-white">Backend & API</h4>
                <p className="text-xs text-slate-400 mt-2">Robust services, caching, and auth patterns.</p>
              </Card>
              <Card className="bg-black border-green-500/20 transition-all duration-300 group hover:shadow-[0_0_40px_8px_rgba(34,197,94,0.25)] hover:border-green-500 hover:bg-[#102c1a] hover:scale-105">
                <Database className="text-green-500 mb-4" />
                <h4 className="font-bold text-white">Infrastructure</h4>
                <p className="text-xs text-slate-400 mt-2">Cloud-native deployment and data resilience.</p>
              </Card>
              <Card className="bg-pink-600/5 border-pink-500/10 transition-all duration-300 group hover:shadow-[0_0_40px_8px_rgba(236,72,153,0.25)] hover:border-pink-500 hover:bg-[#2c101a] hover:scale-105">
                <Terminal className="text-pink-500 mb-4" />
                <h4 className="font-bold text-white">DevOps Culture</h4>
                <p className="text-xs text-slate-400 mt-2">Automated testing and continuous delivery.</p>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      <div className="py-16">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* AI Job Portal Section */}
      <Section className="relative">
        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase mb-6">
              <Sparkles size={14} /> Ecosystem 
            </div>
            <h2 className="text-5xl font-heading font-extrabold mb-6 text-white drop-shadow-lg">AI Job Portal</h2>
            <p className="text-xl text-slate-500 mb-8 leading-relaxed">
              AI Job Portal connects elite AI engineers with cutting-edge opportunities. Featuring AI-powered job matching, skill-based recommendations, and direct access to top tech companies building the future.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "AI-powered job matching",
                "Skill-based recommendations",
                "Direct access to top tech companies",
                "Real-time job alerts",
                "Portfolio showcase for engineers",
                "Smart candidate filtering"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-purple-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-8">
              <Card className="bg-purple-600/10 border-purple-500/20 transition-all duration-300 group hover:shadow-[0_0_40px_8px_rgba(139,92,246,0.25)] hover:border-purple-500 hover:bg-[#1a102c] hover:scale-105">
                <Briefcase className="text-purple-500 mb-4" />
                <h4 className="font-bold text-white">Job Matching</h4>
                <p className="text-xs text-slate-400 mt-2">AI-driven matching for perfect fit.</p>
              </Card>
              <Card className="bg-black border-blue-500/20 transition-all duration-300 group hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.25)] hover:border-blue-500 hover:bg-[#101a2c] hover:scale-105">
                <Users className="text-blue-500 mb-4" />
                <h4 className="font-bold text-white">Talent Pool</h4>
                <p className="text-xs text-slate-400 mt-2">Access elite pre-validated engineers.</p>
              </Card>
              <Card className="bg-black border-green-500/20 transition-all duration-300 group hover:shadow-[0_0_40px_8px_rgba(34,197,94,0.25)] hover:border-green-500 hover:bg-[#102c1a] hover:scale-105">
                <Target className="text-green-500 mb-4" />
                <h4 className="font-bold text-white">Smart Search</h4>
                <p className="text-xs text-slate-400 mt-2">Skills-based filtering and discovery.</p>
              </Card>
              <Card className="bg-pink-600/5 border-pink-500/10 transition-all duration-300 group hover:shadow-[0_0_40px_8px_rgba(236,72,153,0.25)] hover:border-pink-500 hover:bg-[#2c101a] hover:scale-105">
                <Sparkles className="text-pink-500 mb-4" />
                <h4 className="font-bold text-white">Real-time Alerts</h4>
                <p className="text-xs text-slate-400 mt-2">Instant notifications for new roles.</p>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="pb-16"></div>
    </div>
  );
};

export default Products;
