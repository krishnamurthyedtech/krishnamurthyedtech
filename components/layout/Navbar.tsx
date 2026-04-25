import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Sparkle } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
    { label: 'Webinars', href: '/webinars' },
    { label: 'Careers', href: '/careers' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'} bg-black/80 backdrop-blur-xl shadow-2xl`}>
      <div className={`max-w-6xl mx-auto px-6 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-xl rounded-2xl py-3 shadow-2xl' : ''}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group -ml-28">
            <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden">
              <div className="flex items-center">
                <img 
                  src="/KMEdlogo.png" 
                  alt="KMEdtech Logo" 
                  className="h-14 md:h-16 w-auto object-contain mr-2 md:mr-3"
                />
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-2xl md:text-3xl tracking-tighter leading-none text-white">
                    <span className="text-gradient">Krishnamurthy</span>
                  </span>
                  <span className="font-heading font-semibold text-sm md:text-base tracking-[0.3em] text-slate-300">
                    Edtech Pvt Ltd
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-[13px] font-bold uppercase tracking-widest transition-all hover:text-white ${location.pathname === link.href ? 'text-white' : 'text-slate-500'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button size="sm" variant="primary" className="rounded-full px-6 font-bold">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-8 flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-xl font-bold tracking-tight ${location.pathname === link.href ? 'text-white' : 'text-slate-500'}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            <Button className="w-full h-14 text-lg" variant="primary">Contact Us</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
