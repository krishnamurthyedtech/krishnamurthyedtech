import React, { useState, useEffect } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { X, CheckCircle, Send, Settings, Puzzle, BarChart3 } from 'lucide-react';

interface TechnicalConsultingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TechnicalConsultingPopup: React.FC<TechnicalConsultingPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    projectType: '',
    timeline: '',
    budget: '',
    message: '',
  });

  // Refs for form inputs
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const companyRef = React.useRef<HTMLInputElement>(null);
  const roleRef = React.useRef<HTMLInputElement>(null);
  const projectTypeRef = React.useRef<HTMLSelectElement>(null);
  const timelineRef = React.useRef<HTMLSelectElement>(null);
  const budgetRef = React.useRef<HTMLSelectElement>(null);

  // Disable body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields and focus on first empty field
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      nameRef.current?.focus();
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      emailRef.current?.focus();
      return;
    }
    if (!formData.company.trim()) {
      setError('Please enter your company name');
      companyRef.current?.focus();
      return;
    }
    if (!formData.role.trim()) {
      setError('Please enter your role');
      roleRef.current?.focus();
      return;
    }
    if (!formData.projectType) {
      setError('Please select a project type');
      projectTypeRef.current?.focus();
      return;
    }
    if (!formData.timeline) {
      setError('Please select a timeline');
      timelineRef.current?.focus();
      return;
    }
    if (!formData.budget) {
      setError('Please select a budget range');
      budgetRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      // Create email content
      const emailContent = `
Technical Consulting Request - KMEdTech

Personal Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company}
- Role: ${formData.role}

Project Details:
- Project Type: ${formData.projectType}
- Timeline: ${formData.timeline}
- Budget: ${formData.budget}

Additional Message:
${formData.message}

---
This technical consulting request was submitted via KMEdTech website.
      `;

      // Create mailto link
      const mailtoLink = `mailto:contact@krishnamurthyedtech.com?subject=${encodeURIComponent('Technical Consulting Request - KMEdTech')}&body=${encodeURIComponent(emailContent)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      role: '',
      projectType: '',
      timeline: '',
      budget: '',
      message: '',
    });
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="max-w-md w-full p-8 text-center bg-black/80 border-white/10">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-green-400">Request Submitted!</h2>
          <p className="text-slate-300 mb-6">
            Your technical consulting request has been sent to our team at <strong>contact@krishnamurthyedtech.com</strong>.
          </p>
          <p className="text-slate-400 mb-8">
            We'll review your requirements and get back to you within 24-48 hours to discuss your project.
          </p>
          <Button onClick={resetForm} className="mx-auto">
            Close
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 pt-24">
      <div className="w-[700px] max-w-[90%] h-[80vh] bg-black/80 border border-white/40 rounded-3xl p-8 flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <h2 className="text-2xl font-bold text-white">Request Technical Consulting</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name *
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address *
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company *
                </label>
                <input
                  ref={companyRef}
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  placeholder="Your company name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Role *
              </label>
              <input
                ref={roleRef}
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                placeholder="CTO, Engineering Manager, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Project Type *
              </label>
              <select
                ref={projectTypeRef}
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                required
              >
                <option value="" className="text-white bg-black">Select project type</option>
                <option value="architecture" className="text-white bg-black">Architecture Audit</option>
                <option value="scalability" className="text-white bg-black">Scalability Strategy</option>
                <option value="devops" className="text-white bg-black">DevOps Implementation</option>
                <option value="performance" className="text-white bg-black">Performance Optimization</option>
                <option value="comprehensive" className="text-white bg-black">Comprehensive Assessment</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Expected Timeline *
                </label>
                <select
                  ref={timelineRef}
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  required
                >
                  <option value="" className="text-white bg-black">Select timeline</option>
                  <option value="urgent" className="text-white bg-black">Urgent (1-2 weeks)</option>
                  <option value="short" className="text-white bg-black">Short (1-3 months)</option>
                  <option value="medium" className="text-white bg-black">Medium (3-6 months)</option>
                  <option value="long" className="text-white bg-black">Long (6+ months)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Budget Range *
                </label>
                <select
                  ref={budgetRef}
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  required
                >
                  <option value="" className="text-white bg-black">Select budget range</option>
                  <option value="5k-10k" className="text-white bg-black">$5K - $10K</option>
                  <option value="10k-25k" className="text-white bg-black">$10K - $25K</option>
                  <option value="25k-50k" className="text-white bg-black">$25K - $50K</option>
                  <option value="50k+" className="text-white bg-black">$50K+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Additional Information
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20 h-24 resize-none"
                placeholder="Tell us about your project requirements and what you hope to achieve..."
              />
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}
          </form>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="flex gap-4 pt-4 mt-4 flex-shrink-0">
          <Button 
            type="submit" 
            className="flex-1 py-4 text-lg font-bold" 
            size="lg" 
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            {loading ? 'Sending...' : 'Send Request'} <Send className="ml-2 w-5 h-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="flex-1 border border-white/30 hover:border-white/50"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalConsultingPopup;
