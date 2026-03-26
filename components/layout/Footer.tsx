
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center font-bold text-lg">
              KM
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-white">
              EDTECH
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Empowering the next generation of talented engineers through industry-validated pathways and specialized talent engineering.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all">
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all">
              <Github size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Ecosystem</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/products" className="text-slate-400 hover:text-white transition-colors">LearningHub</Link></li>
            <li><Link to="/products" className="text-slate-400 hover:text-white transition-colors">Engineering Outsourcing</Link></li>
            <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors">Skill Assessments</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">Our Philosophy</Link></li>
            <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors">Strategic Consulting</Link></li>
            <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Get in Touch</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
          <p className="text-slate-400 text-sm mb-4">Join our engineering newsletter.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="email@example.com" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 gap-4">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} KMEdTech Talent Engineering. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-slate-500">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};
