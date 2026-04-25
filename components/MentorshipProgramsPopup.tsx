import React, { useState, useEffect } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { X, CheckCircle, Send, GraduationCap, Users, Target, ChevronRight } from 'lucide-react';

interface MentorshipProgramsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const MentorshipProgramsPopup: React.FC<MentorshipProgramsPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentRole: '',
    experience: '',
    careerGoals: '',
    mentorshipType: '',
    duration: '',
    preferredFormat: '',
    message: '',
  });

  // Refs for form inputs
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const currentRoleRef = React.useRef<HTMLInputElement>(null);
  const experienceRef = React.useRef<HTMLSelectElement>(null);
  const mentorshipTypeRef = React.useRef<HTMLSelectElement>(null);
  const durationRef = React.useRef<HTMLSelectElement>(null);
  const preferredFormatRef = React.useRef<HTMLSelectElement>(null);

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
    if (!formData.currentRole.trim()) {
      setError('Please enter your current role');
      currentRoleRef.current?.focus();
      return;
    }
    if (!formData.experience) {
      setError('Please select your years of experience');
      experienceRef.current?.focus();
      return;
    }
    if (!formData.mentorshipType) {
      setError('Please select a mentorship type');
      mentorshipTypeRef.current?.focus();
      return;
    }
    if (!formData.duration) {
      setError('Please select duration');
      durationRef.current?.focus();
      return;
    }
    if (!formData.preferredFormat) {
      setError('Please select a preferred format');
      preferredFormatRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      // Create email content
      const emailContent = `
Mentorship Program Application - KMEdTech

Personal Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Professional Details:
- Current Role: ${formData.currentRole}
- Years of Experience: ${formData.experience}

Mentorship Requirements:
- Mentorship Type: ${formData.mentorshipType}
- Duration: ${formData.duration}
- Preferred Format: ${formData.preferredFormat}

Additional Message:
${formData.message}

---
This mentorship program application was submitted via KMEdTech website.
      `;

      // Create mailto link
      const mailtoLink = `mailto:contact@krishnamurthyedtech.com?subject=${encodeURIComponent('Mentorship Program Application - KMEdTech')}&body=${encodeURIComponent(emailContent)}`;
      
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
      currentRole: '',
      experience: '',
      careerGoals: '',
      mentorshipType: '',
      duration: '',
      preferredFormat: '',
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
            Your mentorship request has been sent to our team at <strong>contact@krishnamurthyedtech.com</strong>.
          </p>
          <p className="text-slate-400 mb-8">
            We'll review your requirements and get back to you within 24-48 hours to match you with a suitable mentor.
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
          <h2 className="text-2xl font-bold text-white">Apply for Mentorship Programs</h2>
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
                  Current Role *
                </label>
                <input
                  ref={currentRoleRef}
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  placeholder="Software Engineer, etc."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Years of Experience *
                </label>
                <select
                  ref={experienceRef}
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  required
                >
                  <option value="" className="text-white bg-black">Select experience level</option>
                  <option value="0-2" className="text-white bg-black">0-2 years</option>
                  <option value="3-5" className="text-white bg-black">3-5 years</option>
                  <option value="6-10" className="text-white bg-black">6-10 years</option>
                  <option value="10+" className="text-white bg-black">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Mentorship Type *
                </label>
                <select
                  ref={mentorshipTypeRef}
                  name="mentorshipType"
                  value={formData.mentorshipType}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  required
                >
                  <option value="" className="text-white bg-black">Select mentorship type</option>
                  <option value="career" className="text-white bg-black">Career Growth</option>
                  <option value="technical" className="text-white bg-black">Technical Skills</option>
                  <option value="leadership" className="text-white bg-black">Leadership Development</option>
                  <option value="startup" className="text-white bg-black">Startup Guidance</option>
                  <option value="interview" className="text-white bg-black">Interview Preparation</option>
                  <option value="comprehensive" className="text-white bg-black">Comprehensive Development</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Career Goals *
              </label>
              <textarea
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20 h-24 resize-none"
                placeholder="Describe your career goals and what you want to achieve through mentorship..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  <option value="1-month" className="text-white bg-black">1 Month</option>
                  <option value="3-months" className="text-white bg-black">3 Months</option>
                  <option value="6-months" className="text-white bg-black">6 Months</option>
                  <option value="1-year" className="text-white bg-black">1 Year</option>
                  <option value="ongoing" className="text-white bg-black">Ongoing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Preferred Format *
                </label>
                <select
                  ref={preferredFormatRef}
                  name="preferredFormat"
                  value={formData.preferredFormat}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  required
                >
                  <option value="" className="text-white bg-black">Select format</option>
                  <option value="weekly" className="text-white bg-black">Weekly Sessions</option>
                  <option value="biweekly" className="text-white bg-black">Bi-weekly Sessions</option>
                  <option value="monthly" className="text-white bg-black">Monthly Sessions</option>
                  <option value="flexible" className="text-white bg-black">Flexible Schedule</option>
                  <option value="intensive" className="text-white bg-black">Intensive Program</option>
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
                placeholder="Tell us about your specific challenges, preferred mentor qualities, or any other requirements..."
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
            {loading ? 'Sending...' : 'Send Application'} <Send className="ml-2 w-5 h-5" />
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

export default MentorshipProgramsPopup;
