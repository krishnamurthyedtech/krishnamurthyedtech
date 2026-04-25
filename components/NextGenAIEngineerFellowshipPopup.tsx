import React, { useState, useEffect } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { X, CheckCircle, Send, GraduationCap, Users, Target, FileText } from 'lucide-react';

interface NEXTGenAIEngineerFellowshipPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NEXTGenAIEngineerFellowshipPopup: React.FC<NEXTGenAIEngineerFellowshipPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    degree: '',
    year: '',
    program: '',
    duration: '',
    skills: '',
    availability: '',
    message: '',
  });

  // Refs for form inputs
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const universityRef = React.useRef<HTMLInputElement>(null);
  const degreeRef = React.useRef<HTMLInputElement>(null);
  const yearRef = React.useRef<HTMLSelectElement>(null);
  const programRef = React.useRef<HTMLSelectElement>(null);
  const durationRef = React.useRef<HTMLSelectElement>(null);
  const skillsRef = React.useRef<HTMLTextAreaElement>(null);
  const availabilityRef = React.useRef<HTMLSelectElement>(null);

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
    if (!formData.university.trim()) {
      setError('Please enter your university name');
      universityRef.current?.focus();
      return;
    }
    if (!formData.degree.trim()) {
      setError('Please enter your degree');
      degreeRef.current?.focus();
      return;
    }
    if (!formData.year) {
      setError('Please select your year of study');
      yearRef.current?.focus();
      return;
    }
    if (!formData.program) {
      setError('Please select a fellowship program');
      programRef.current?.focus();
      return;
    }
    if (!formData.duration) {
      setError('Please select duration');
      durationRef.current?.focus();
      return;
    }
    if (!formData.skills.trim()) {
      setError('Please enter your technical skills');
      skillsRef.current?.focus();
      return;
    }
    if (!formData.availability) {
      setError('Please select your availability');
      availabilityRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      // Create email content
      const emailContent = `
NEXTGen AI Engineer Fellowship Request - KMEdTech

Personal Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Academic Details:
- University: ${formData.university}
- Degree: ${formData.degree}
- Year of Study: ${formData.year}

Fellowship Preferences:
- Program: ${formData.program}
- Duration: ${formData.duration}
- Skills: ${formData.skills}
- Availability: ${formData.availability}

Additional Message:
${formData.message}

---
This fellowship application was submitted via KMEdTech website.
      `;

      // Create mailto link
      const mailtoLink = `mailto:contact@krishnamurthyedtech.com?subject=${encodeURIComponent('NEXTGen AI Engineer Fellowship Request - KMEdTech')}&body=${encodeURIComponent(emailContent)}`;
      
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
      university: '',
      degree: '',
      year: '',
      program: '',
      duration: '',
      skills: '',
      availability: '',
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
            Your NEXTGen AI Engineer Fellowship application has been sent to our team at <strong>contact@krishnamurthyedtech.com</strong>.
          </p>
          <p className="text-slate-400 mb-8">
            We'll review your application and get back to you within 24-48 hours for next steps.
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
          <h2 className="text-2xl font-bold text-white">Apply for NEXTGen AI Engineer Fellowship</h2>
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
                  University *
                </label>
                <input
                  ref={universityRef}
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  placeholder="Your university name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Degree *
                </label>
                <input
                  ref={degreeRef}
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  placeholder="B.Tech, MCA, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Year of Study *
                </label>
                <select
                  ref={yearRef}
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  required
                >
                  <option value="" className="text-white bg-black">Select year</option>
                  <option value="1st" className="text-white bg-black">1st Year</option>
                  <option value="2nd" className="text-white bg-black">2nd Year</option>
                  <option value="3rd" className="text-white bg-black">3rd Year</option>
                  <option value="4th" className="text-white bg-black">4th Year</option>
                  <option value="final" className="text-white bg-black">Final Year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Fellowship Program *
                </label>
                <select
                  ref={programRef}
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                  required
                >
                  <option value="" className="text-white bg-black">Select program</option>
                  <option value="ai-ml" className="text-white bg-black">AI/ML Engineering</option>
                  <option value="nlp" className="text-white bg-black">Natural Language Processing</option>
                  <option value="cv" className="text-white bg-black">Computer Vision</option>
                  <option value="data-science" className="text-white bg-black">Data Science</option>
                  <option value="mlops" className="text-white bg-black">MLOps & AI Infrastructure</option>
                  <option value="generative-ai" className="text-white bg-black">Generative AI</option>
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
                  <option value="1-month" className="text-white bg-black">1 Month</option>
                  <option value="2-months" className="text-white bg-black">2 Months</option>
                  <option value="3-months" className="text-white bg-black">3 Months</option>
                  <option value="6-months" className="text-white bg-black">6 Months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Technical Skills *
              </label>
              <textarea
                ref={skillsRef}
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20 h-24 resize-none"
                placeholder="List your technical skills (e.g., React, Node.js, Python, etc.)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Availability *
              </label>
              <select
                ref={availabilityRef}
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20"
                required
              >
                <option value="" className="text-white bg-black">Select availability</option>
                <option value="immediate" className="text-white bg-black">Immediate</option>
                <option value="1-month" className="text-white bg-black">Within 1 month</option>
                <option value="2-months" className="text-white bg-black">Within 2 months</option>
                <option value="3-months" className="text-white bg-black">Within 3 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cover Letter / Additional Information
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:border-white/20 h-24 resize-none"
                placeholder="Tell us why you're interested in this fellowship and your AI career goals..."
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
            {loading ? 'Sending...' : 'Submit Application'} <Send className="ml-2 w-5 h-5" />
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

export default NEXTGenAIEngineerFellowshipPopup;
