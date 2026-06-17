
import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Target, Heart, Eye, Rocket } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24">
      <Section containerClassName="max-w-4xl text-center">
        <h1 className="text-5xl font-heading font-bold mb-6">Our Philosophy</h1>
        <p className="text-xl text-slate-400 leading-relaxed italic">
          "The digital future isn't built by those who simply write code; it is architected by talented engineers who understand the systems they create."
        </p>
      </Section>

      <Section className="bg-brand-dark/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gradient">The Krishnamurthy EdTech Pvt Ltd Story</h2>
            <p className="text-slate-400 leading-relaxed">
              At Krishnamurthy EdTech Pvt Ltd, we develop AI-powered agents, cloud-based SaaS Applications , and cutting-edge R&D initiatives while building a skilled talent pool. We help educational institutions automate operations, enhance efficiency, and achieve better outcomes.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We reimagined the journey of a developer as a specialized <span className="text-white font-semibold">Talent Engineering Pathway</span>. By focusing on deep architectural knowledge and production-ready skills, we surface the world's most capable engineers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-blue-500/10">
              <Eye className="text-blue-500 mb-4" />
              <h4 className="font-bold mb-2">Our Vision</h4>
              <p className="text-xs text-slate-500">To be a leader in AI-driven educational innovation, empowering institutions through intelligent technology, research excellence, and future-ready talent.</p>
            </Card>
            <Card className="border-purple-500/10">
              <Target className="text-purple-500 mb-4" />
              <h4 className="font-bold mb-2">Our Mission</h4>
              <p className="text-xs text-slate-500">Empowering individuals to reach their highest potential as Talented Engineers.</p>
            </Card>
            <Card className="border-pink-500/10">
              <Heart className="text-pink-500 mb-4" />
              <h4 className="font-bold mb-2">Our Values</h4>
              <p className="text-xs text-slate-500">Excellence in execution, integrity in validation, and a commitment to growth.</p>
            </Card>
            <Card className="border-orange-500/10">
              <Rocket className="text-orange-500 mb-4" />
              <h4 className="font-bold mb-2">Our Culture</h4>
              <p className="text-xs text-slate-500">Engineering-first mindset, where every challenge is an opportunity to innovate.</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4">The Krishnamurthy EdTech Pvt Ltd Difference</h2>
          <p className="text-slate-400">We prioritize depth, mastery, and professional readiness above all else.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Systems Mastery",
              desc: "We focus on how components interact, ensuring our engineers build scalable, resilient, and performant systems."
            },
            {
              title: "Industry Validation",
              desc: "Our pathways are co-developed with leading CTOs to ensure that 'talented' translates directly to 'business value'."
            },
            {
              title: "Rigorous Assessment",
              desc: "Validation at KMEdTech is a badge of honor. It represents a proven ability to deliver high-quality engineering solutions."
            }
          ].map((item, idx) => (
            <Card key={idx} className="bg-white/5">
              <h3 className="text-xl font-bold mb-4 text-blue-400">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="mb-4 pb-0">
        <Card className="grid grid-cols-1 lg:grid-cols-2 p-0 overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl">
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <h4 className="text-[#06b6d4] font-bold tracking-widest text-xs uppercase mb-4">Live Geo Coordinates</h4>
            <h2 className="text-3xl font-bold text-white mb-10">Krishnamurthy EdTech Pvt Ltd</h2>
            
            <div className="space-y-6 mb-12">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Latitude</p>
                <p className="text-white font-medium">12.9208° N</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Longitude</p>
                <p className="text-white font-medium">77.6127° E</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Location</p>
                <p className="text-white font-medium">BTM 1st Stage, Bengaluru</p>
              </div>
            </div>
            
            <p className="text-slate-500 text-xs leading-relaxed mt-auto pt-6 border-t border-white/5">
              Feel free to visit us directly for on-site design discussions.<br/>
              Prior appointments are appreciated.
            </p>
          </div>
          <div className="relative min-h-[400px] lg:min-h-full w-full h-full p-4 lg:p-6 lg:pl-0">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d220.89675368262473!2d77.6127803!3d12.9208567!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae150020be2077%3A0xf202a605d87195d8!2sKrishnamurthy%20EdTech%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1781697891373!5m2!1sen!2sin" 
              className="w-full h-full rounded-xl border-0 bg-white/5" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Card>
      </Section>
    </div>
  );
};

export default About;
