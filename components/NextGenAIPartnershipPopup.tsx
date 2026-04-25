import React, { useState, useEffect } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { X, CheckCircle, Send, Users, Code, Target, FileText } from 'lucide-react';

interface NEXTGenAIPartnershipPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NEXTGenAIPartnershipPopup: React.FC<NEXTGenAIPartnershipPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    teamSize: '',
    duration: '',
    skills: '',
    engagement: '',
    message: '',
  });

  // Refs for form inputs
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const companyRef = React.useRef<HTMLInputElement>(null);
  const roleRef = React.useRef<HTMLInputElement>(null);
  const teamSizeRef = React.useRef<HTMLSelectElement>(null);
  const durationRef = React.useRef<HTMLSelectElement>(null);
  const skillsRef = React.useRef<HTMLTextAreaElement>(null);
  const engagementRef = React.useRef<HTMLSelectElement>(null);

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
    if (!formData.teamSize) {
      setError('Please select team size');
      teamSizeRef.current?.focus();
      return;
    }
    if (!formData.duration) {
      setError('Please select duration');
      durationRef.current?.focus();
      return;
    }
    if (!formData.skills.trim()) {
      setError('Please enter required skills');
      skillsRef.current?.focus();
      return;
    }
    if (!formData.engagement) {
      setError('Please select engagement type');
      engagementRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      // Create email content
      const emailContent = `
NEXTGen AI Partnership Request - KMEdTech

Personal Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company}
- Role: ${formData.role}

Partnership Requirements:
- Team Size: ${formData.teamSize}
- Duration: ${formData.duration}
- Required Skills: ${formData.skills}
- Engagement Type: ${formData.engagement}

Additional Message:
${formData.message}

---
This NEXTGen AI Partnership request was submitted via KMEdTech website.
      `;

      // Create mailto link
      const mailtoLink = `mailto:contact@krishnamurthyedtech.com?subject=${encodeURIComponent('NEXTGen AI Partnership Request - KMEdTech')}&body=${encodeURIComponent(emailContent)}`;
      
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
      teamSize: '',
      duration: '',
      skills: '',
      engagement: '',
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
            Your NEXTGen AI Partnership request has been sent to our team at <strong>contact@krishnamurthyedtech.com</strong>.
          </p>
          <p className="text-slate-400 mb-8">
            We'll review your requirements and get back to you within 24-48 hours to discuss partnership opportunities.
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
          <h2 className="text-2xl font-bold text-white">Request NEXTGen AI Partnership</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Team Size *
                </label>
                <select
                  ref={teamSizeRef}
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  required
                >
                  <option value="" className="text-white bg-black">Select team size</option>
                  <option value="small" className="text-white bg-black">Small (2-5 developers)</option>
                  <option value="medium" className="text-white bg-black">Medium (6-10 developers)</option>
                  <option value="large" className="text-white bg-black">Large (10+ developers)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Duration *
                </label>
                <select
                  ref={durationRef}
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  required
                >
                  <option value="" className="text-white bg-black">Select duration</option>
                  <option value="short" className="text-white bg-black">Short-term (1-3 months)</option>
                  <option value="medium" className="text-white bg-black">Medium-term (3-6 months)</option>
                  <option value="long" className="text-white bg-black">Long-term (6+ months)</option>
                  <option value="ongoing" className="text-white bg-black">Ongoing project</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Required Skills *
              </label>
              <textarea
                ref={skillsRef}
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20 h-24 resize-none"
                placeholder="e.g., React, Node.js, Python, AWS, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Engagement Type *
              </label>
              <select
                ref={engagementRef}
                name="engagement"
                value={formData.engagement}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                required
              >
                <option value="" className="text-white bg-black">Select engagement type</option>
                <option value="managed" className="text-white bg-black">Managed Agile Squads</option>
                <option value="staff" className="text-white bg-black">Staff Augmentation</option>
                <option value="project" className="text-white bg-black">Project-based</option>
                <option value="dedicated" className="text-white bg-black">Dedicated Team</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Project Description
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20 h-24 resize-none"
                placeholder="Tell us about your project requirements and goals..."
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

export default NEXTGenAIPartnershipPopup;
