
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
            <h2 className="text-3xl font-bold text-gradient">The KMEdTech Story</h2>
            <p className="text-slate-400 leading-relaxed">
              KMEdTech was founded to bridge the critical gap between traditional technical education and the high demands of the modern software industry. We observed that true engineering talent is often hidden behind standard credentials.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We reimagined the journey of a developer as a specialized <span className="text-white font-semibold">Talent Engineering Pathway</span>. By focusing on deep architectural knowledge and production-ready skills, we surface the world's most capable engineers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-blue-500/10">
              <Eye className="text-blue-500 mb-4" />
              <h4 className="font-bold mb-2">Our Vision</h4>
              <p className="text-xs text-slate-500">To be the global gold standard for validating and discovering elite technical talent.</p>
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
          <h2 className="text-4xl font-heading font-bold mb-4">The KMEdTech Difference</h2>
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
    </div>
  );
};

export default About;
