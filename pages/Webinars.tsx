import React, { useState, useEffect } from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Calendar, Clock, Video, PlayCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { webinarsApi, WebinarRegistrationFormData, WebinarSessionResponse } from '../api';

const Webinars: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<WebinarSessionResponse | null>(null);
  const [webinarSessions, setWebinarSessions] = useState<WebinarSessionResponse[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    whatsapp: '',
    industry: '',
    companyRole: '',
    contactMethod: 'email',
    consent: false,
  });
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Fetch webinar sessions on component mount
  useEffect(() => {
    const fetchWebinarSessions = async () => {
      try {
        const response = await webinarsApi.getActiveSessions();
        setWebinarSessions(response.data);
      } catch (error) {
        console.error('Failed to fetch webinar sessions:', error);
      }
    };
    fetchWebinarSessions();
  }, []);

  // Keep page scrollable except when pointer is over the modal content
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!isModalOpen) return;
      const modal = document.getElementById('webinar-register-modal');
      if (!modal) return;
      const rect = modal.getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
        // user scrolling inside modal content
        const maxScroll = modal.scrollHeight - modal.clientHeight;
        const atTop = modal.scrollTop === 0 && event.deltaY < 0;
        const atBottom = modal.scrollTop === maxScroll && event.deltaY > 0;
        if (!atTop && !atBottom) {
          event.preventDefault();
          modal.scrollTop += event.deltaY;
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel); 
  }, [isModalOpen]);

  const openRegisterModal = (session: WebinarSessionResponse) => {
    setSelectedSession(session);
    setIsModalOpen(true);
    setSubmissionMessage('');
    setMeetingLink('');
    setHasSubscribed(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      whatsapp: '',
      industry: '',
      companyRole: '',
      contactMethod: 'email',
      consent: false,
    });
  };

  const closeRegisterModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setSubmissionMessage('Please enter both first and last name.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setSubmissionMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.industry.trim() || !formData.companyRole.trim()) {
      setSubmissionMessage('Please complete all professional information fields.');
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setSubmissionMessage('Please enter your phone number.');
      return;
    }

    if (!formData.consent) {
      setSubmissionMessage('Please agree to receive updates to complete registration.');
      return;
    }

    if (formData.contactMethod === 'whatsapp') {
      const whatsappRegex = /^\+[0-9]+$/;
      if (!whatsappRegex.test(formData.whatsapp.trim())) {
        setSubmissionMessage('WhatsApp number must start with + and contain only digits.');
        return;
      }
    }

    const link = `https://meet.kmedtech.com/${selectedSession.title.toLowerCase().replace(/\s+/g, '-') }?id=${Date.now()}`;
    setMeetingLink(link);

    const destination = formData.contactMethod === 'whatsapp' && formData.whatsapp.trim() ? formData.whatsapp.trim() : formData.email.trim();
    const method = formData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email';

    try {
      const payload: WebinarRegistrationFormData = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone_number: formData.phoneNumber.trim() || undefined,
        industry: formData.industry.trim(),
        company_team_role: formData.companyRole.trim(),
        preferred_contact_method: formData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email',
        consent_to_updates: formData.consent,
        webinar_session_id: selectedSession?.id,
      };
      const response = await webinarsApi.registerForm(payload);

      setSubmissionMessage(`${method} registration successful! Meeting link queued for ${destination}.`);
      setHasSubscribed(true);
    } catch (error: any) {
      console.error('Webinar registration error', error);
      setSubmissionMessage('Registration failed. Please try again later.');
    }
  };

  const upcomingWebinars = webinarSessions.map(session => ({
    id: session.id,
    title: session.title,
    date: session.date,
    time: session.time,
    speaker: session.speaker_name,
    role: session.speaker_role,
    description: session.description,
    duration: session.duration,
    image: 'bg-blue-600/20',
    icon: <Users className="text-blue-500 w-8 h-8" />,
  }));

  const pastWebinars = [
    {
      title: 'Next.js 14 App Router: A Deep Dive',
      date: 'March 10, 2026',
      duration: '1h 15m',
      image: 'bg-pink-600/20',
    },
    {
      title: 'Effective DevOps for Startups',
      date: 'February 25, 2026',
      duration: '55m',
      image: 'bg-green-600/20',
    },
    {
      title: 'Building Resilient Frontend Architectures',
      date: 'February 12, 2026',
      duration: '1h 30m',
      image: 'bg-orange-600/20',
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <Section containerClassName="max-w-4xl text-center mb-16">
        <h1 className="text-5xl font-heading font-bold mb-6">Masterclasses & Webinars</h1>
        <p className="text-slate-400 text-lg">
          Deep dives into modern engineering, system design, and career progression with industry leaders.
        </p>
      </Section>

      <Section className="mb-20">
        <div className="flex items-center gap-3 mb-10">
          <Calendar className="text-blue-500 w-8 h-8" />
          <h2 className="text-3xl font-bold">Upcoming Sessions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingWebinars.map((webinar, idx) => (
            <Card key={idx} className="overflow-hidden p-0 border-white/10 group cursor-pointer hover:border-blue-500/50 transition-all">
              <div className={`h-40 ${webinar.image} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
                {webinar.icon}
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm font-semibold text-slate-300 mb-4">
                  <div className="flex items-center gap-1.5 text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    <Calendar size={14} /> {webinar.date}
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-slate-400">
                    <Clock size={14} /> {webinar.time}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{webinar.title}</h3>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700" />
                  <div>
                    <p className="font-semibold text-sm">{webinar.speaker}</p>
                    <p className="text-xs text-slate-500">{webinar.role}</p>
                  </div>
                </div>

                <Button className="w-full" onClick={() => openRegisterModal(webinarSessions.find((s: any) => s.id === webinar.id)!)}>
                  Register Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-3 overflow-auto pointer-events-none">
          <div id="webinar-register-modal" className="pointer-events-auto w-full max-w-xl rounded-3xl border border-white/20 bg-slate-950 p-6 shadow-2xl max-h-[95vh] overflow-auto">
            <div className="h-full overflow-y-auto pr-1 pb-4">
              <div className="sticky top-0 z-10 flex items-center justify-between bg-slate-950/95 pb-3 pt-1 mb-4 border-b border-white/10">
                <h3 className="text-xl font-bold break-words">Register for {selectedSession?.title || 'Webinar'}</h3>
                <button
                  className="rounded-full bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
                  onClick={closeRegisterModal}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {hasSubscribed ? (
                <div className="space-y-3">
                  <p className="text-green-400 font-medium">{submissionMessage}</p>
                  <p className="text-sm text-slate-300 break-words">
                    Meeting link: <a href={meetingLink} target="_blank" rel="noreferrer" className="text-blue-300 underline">{meetingLink}</a>
                  </p>

                  {formData.contactMethod === 'email' ? (
                    <a
                      href={`mailto:${encodeURIComponent(formData.email)}?subject=${encodeURIComponent(`Webinar Registration: ${selectedSession?.title || 'Webinar'}`)}&body=${encodeURIComponent(`Hello ${formData.firstName} ${formData.lastName},%0A%0AThank you for registering for ${selectedSession?.title || 'Webinar'}!%0A%0ADetails:%0A• Date: ${selectedSession?.date || 'TBD'}%0A• Time: ${selectedSession?.time || 'TBD'}%0A• Duration: ${selectedSession?.duration || 'TBD'}%0A• Speaker: ${selectedSession?.speaker_name || 'TBD'}%0A%0AMeeting link: ${meetingLink}%0A%0ALook forward to seeing you!`)}`}
                      className="inline-flex w-full justify-center rounded-lg border border-blue-500 px-4 py-2 text-sm text-blue-100 hover:bg-blue-500/20"
                    >
                      Send Link via Email
                    </a>
                  ) : (
                    <a
                      href={`https://wa.me/${encodeURIComponent(formData.whatsapp.replace(/\D/g, ''))}?text=${encodeURIComponent(`Hello ${formData.firstName} ${formData.lastName},%0A%0AThanks for registering for ${selectedSession?.title || 'Webinar'}!%0A%0ADetails:%0A• Date: ${selectedSession?.date || 'TBD'}%0A• Time: ${selectedSession?.time || 'TBD'}%0A• Duration: ${selectedSession?.duration || 'TBD'}%0A• Speaker: ${selectedSession?.speaker_name || 'TBD'}%0A%0AMeeting link: ${meetingLink}%0A%0ASee you there!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full justify-center rounded-lg border border-green-500 px-4 py-2 text-sm text-green-100 hover:bg-green-500/20"
                    >
                      Open WhatsApp to Send Link
                    </a>
                  )}

                  <p className="text-xs text-slate-400">(A share link is prepared—click to complete delivery via your preferred app.)</p>
                  <Button className="w-full" onClick={closeRegisterModal}>
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-base font-semibold text-slate-200">First name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white focus:border-blue-400 outline-none"
                      placeholder="First name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-base font-semibold text-slate-200">Last name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white focus:border-blue-400 outline-none"
                      placeholder="Last name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-base font-semibold text-slate-200">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white focus:border-blue-400 outline-none"
                      placeholder="name@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-base font-semibold text-slate-200">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber || ''}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white focus:border-blue-400 outline-none"
                      placeholder="+919876543210"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-base font-semibold text-slate-200">Industry *</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white focus:border-blue-400 outline-none"
                      placeholder="Industry"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-base font-semibold text-slate-200">Company Team / Role *</label>
                    <input
                      type="text"
                      name="companyRole"
                      value={formData.companyRole}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white focus:border-blue-400 outline-none"
                      placeholder="Team / Role"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-semibold text-slate-200">Preferred contact method</label>
                    <div className="flex gap-4">
                      <label className="text-base flex items-center gap-2 text-white">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={formData.contactMethod === 'email'}
                          onChange={handleInputChange}
                          className="h-4 w-4 accent-blue-500"
                        />
                        Email
                      </label>
                      <label className="text-base flex items-center gap-2 text-white">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="whatsapp"
                          checked={formData.contactMethod === 'whatsapp'}
                          onChange={handleInputChange}
                          className="h-4 w-4 accent-green-500"
                        />
                        WhatsApp
                      </label>
                    </div>
                  </div>

                  {formData.contactMethod === 'whatsapp' && (
                    <div>
                      <label className="text-base font-semibold text-slate-200">WhatsApp Number</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        pattern="^\+[0-9]+$"
                        title="Enter + followed by country code and number, digits only"
                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white focus:border-blue-400 outline-none"
                        placeholder="+919876543210"
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 accent-blue-500"
                    />
                    <label className="text-xs text-slate-400">
                      I consent to receive emails/WhatsApp updates about this webinar and future events.
                    </label>
                  </div>

                  {submissionMessage && <p className="text-sm text-amber-300">{submissionMessage}</p>}

                  <Button type="submit" className="w-full py-3 text-base font-semibold">
                    Submit Registration
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Section className="mt-20 text-center">
        <Card className="max-w-3xl mx-auto py-12 px-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-white/10 flex flex-col items-center">
          <Video className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-2xl font-bold mb-4">Want to speak at our next event?</h3>
          <p className="text-slate-400 mb-8 max-w-lg">
            We're always looking for industry experts to share their knowledge with our growing community of engineers.
          </p>
          <Link to="/contact">
            <Button variant="outline">Apply to Speak</Button>
          </Link>
        </Card>
      </Section>
    </div>
  );
};

export default Webinars;
