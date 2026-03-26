
import React, { useState } from 'react';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Mail, MapPin, Phone, Send, Check } from 'lucide-react';
import { contactApi, ContactData } from '../api';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ContactData>({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await contactApi.create(form);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      if (err.response) {
        // Server responded with error status
        setError(`Error: ${err.response.status} - ${err.response.data?.detail || err.response.statusText}`);
      } else if (err.request) {
        // Request made but no response
        setError('No response from server. Is the backend running?');
      } else {
        // Error in request setup
        setError(err.message || 'Failed to send message');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <Section containerClassName="max-w-4xl text-center mb-16">
        <h1 className="text-5xl font-heading font-bold mb-6">Let's Build Together</h1>
        <p className="text-slate-400 text-lg">
          Whether you're looking to hire top talent, optimize your engineering processes, or join our community, we're ready to talk.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Email Us</p>
                    <p className="text-slate-400">contact@krishnamurthyedtech.com</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Call Us</p>
                    <p className="text-slate-400">+91 9482169636</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Our Headquarters</p>
                    <p className="text-slate-400">Btm 1st stage, Bangalore, India</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-white/5">
              <h4 className="font-bold mb-2">Visit us at GitHub</h4>
              <p className="text-xs text-slate-500 mb-4">See how we build software and contribute to the community.</p>
              <a href="https://github.com" target="_blank" className="text-blue-400 text-sm font-semibold hover:underline">@kmedtech-talent</a>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-10 border-white/10 bg-white/[0.02]" hoverable={false}>
              {submitted ? (
                <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Received</h3>
                  <p className="text-slate-400">Our team will get back to you within 24 hours.</p>
                  <Button variant="ghost" className="mt-8" onClick={() => setSubmitted(false)}>Send another message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={form.name}
                        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                        placeholder="John Doe" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={form.email}
                        onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                        placeholder="john@example.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Subject</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-300"
                      value={form.subject}
                      onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
                    >
                      <option className="bg-brand-dark">General Inquiry</option>
                      <option className="bg-brand-dark">Hiring Talent</option>
                      <option className="bg-brand-dark">Technical Consulting</option>
                      <option className="bg-brand-dark">Assessments</option>
                      <option className="bg-brand-dark">Partnerships</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Message</label>
                    <textarea 
                      required
                      rows={5} 
                      value={form.message}
                      onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                      placeholder="Tell us about your needs..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    ></textarea>
                  </div>
                  {error && <div className="text-red-400 text-sm">{error}</div>}
                  <Button type="submit" className="w-full py-4 text-lg font-bold" size="lg" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'} <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
