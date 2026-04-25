
import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-10 pb-8 px-5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-32 mb-8" style={{ gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'start' }}>
        {/* Contact Info */}
        <div className="w-full">
          <h4 className="text-white font-semibold mb-4 text-base">Contact Info</h4>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-3 text-slate-400">
              <Phone size={18} className="mt-0.5 flex-shrink-0" />
              <span>+91 9482169636</span>
            </li>
            <li className="flex items-start gap-3 text-slate-400">
              <Mail size={18} className="mt-0.5 flex-shrink-0" />
              <a href="mailto:contact@krishnamurthyedtech.com" className="hover:text-white transition-colors">contact@krishnamurthyedtech.com</a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div className="w-full">
          <h4 className="text-white font-semibold mb-4 text-base">Address</h4>
          <a href="https://maps.app.goo.gl/VdQhBBSF7yVZA7oAA" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-slate-400 text-base hover:text-white transition-colors">
            <MapPin size={18} className="mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed whitespace-nowrap">
              2nd floor, 2, Vismayoga, 1st E cross, 20th main,<br />BTM Layout 1st stage, Maruthi Nagara Main road,<br />Near Gangothri circle, Bengaluru 560029
            </p>
          </a>
        </div>

        {/* Follow Us */}
        <div className="w-full">
          <h4 className="text-white font-semibold mb-4 text-base">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://x.com/Krishanmurthy99?s=20" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all">
              <Twitter size={18} />
            </a>
            <a href="https://www.linkedin.com/company/krishnamurthyedtech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all">
              <Linkedin size={18} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582280556220" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/krishnamurthy_edtech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto border-t border-white/5 pt-6 text-center">
        <p className="text-slate-500 text-sm">
          © 2026 KMEdTech Talent Engineering. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
