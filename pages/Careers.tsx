import React, { useState } from 'react';

import { Section } from '../components/common/Section';

import { Card } from '../components/common/Card';

import { Button } from '../components/common/Button';

import { careerApi, CareerApplicationData } from '../api';

import { preview } from 'vite';

import { useNavigate } from 'react-router-dom';

const Careers: React.FC = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState<CareerApplicationData & { resume: File | null; terms: boolean }>({

    full_name: '',

    email: '',

    phone: '',

    location: '',

    education: '',

    role: '',

    linkedin: '',

    portfolio: '',

    resume_url: '',

    cover_letter: '',

    resume: null as File | null,

    terms: false,

  });

  const [success, setSuccess] = useState('');

  const [error, setError] = useState('');

  const [showFormModal, setShowFormModal] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === 'checkbox') {

      setFormState((prev: CareerApplicationData & { resume: File | null; terms: boolean }) => ({ ...prev, [name]: checked }));

      return;

    }

    setFormState((prev: CareerApplicationData & { resume: File | null; terms: boolean }) => ({ ...prev, [name]: value }));

  };



  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0] || null;

    setFormState((prev: CareerApplicationData & { resume: File | null; terms: boolean }) => ({ ...prev, resume: file }));

  };



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();



    if (!formState.full_name.trim() || !formState.email.trim() || !formState.role.trim() || !formState.resume || !formState.terms) {

      setError('Please complete all required fields before submitting.');

      setSuccess('');

      return;

    }



    const formData = new FormData();

    formData.append('full_name', formState.full_name.trim());

    formData.append('email', formState.email.trim());

    formData.append('phone', formState.phone?.trim() || '');

    formData.append('location', formState.location?.trim() || '');

    formData.append('education', formState.education?.trim() || '');

    formData.append('role', formState.role.trim());

    formData.append('linkedin', formState.linkedin?.trim() || '');

    formData.append('portfolio', formState.portfolio?.trim() || '');

    formData.append('cover_letter', formState.cover_letter?.trim() || '');

    if (formState.resume) {

      formData.append('resume', formState.resume);

    }



    try {

      console.log('Submitting form data:', formData);

      const response = await careerApi.apply(formData);

      console.log('API response:', response);

      setSuccess('Thanks! Your internship application has been submitted successfully. We will contact you soon.');

      setError('');

      setFormState({

        full_name: '',

        email: '',

        phone: '',

        location: '',

        education: '',

        role: '',

        linkedin: '',

        portfolio: '',

        resume_url: '',

        cover_letter: '',

        resume: null,

        terms: false,

      });

    } catch (error: any) {

      console.error('Career application error:', error);

      console.error('Error response:', error.response);

      console.error('Error status:', error.response?.status);

      console.error('Error data:', error.response?.data);

      setError('Failed to send application. Please try again later.');

      setSuccess('');

    }

  };



  return (

    <div className="pt-24 pb-20">

      <Section className="max-w-6xl mx-auto mb-10">
        <Card className="text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Internship Program</h3>
          <p className="text-slate-400 mb-4">
            Ready to start your journey with KMEdTech? Apply now and take the first step into a hands-on internship experience.
          </p>
          <div className="flex justify-center">
            <Button variant="secondary" size="lg" onClick={() => navigate('/contact')}>
              Apply for Internship
            </Button>
          </div>
        </Card>
      </Section>

      {showFormModal && (

        <div

          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"

          onClick={() => setShowFormModal(false)}

          onWheel={e => {

            if (e.target === e.currentTarget) {

              window.scrollBy({ top: e.deltaY, behavior: 'auto' });

            }

          }}

        >

          <div

            className="w-full max-w-md max-h-[78vh] overflow-hidden rounded-xl bg-slate-900 p-4 shadow-xl border border-white/10"

            onClick={e => e.stopPropagation()}

          >

            <div className="mb-3 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">Internship Application</h2>

              <button

                type="button"

                className="rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-400"

                onClick={() => setShowFormModal(false)}

                aria-label="Close form"

              >

                ×

              </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 pb-6">

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                <div>

                  <label className="text-sm font-semibold text-slate-300">Full Name *</label>

                  <input name="full_name" value={formState.full_name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder:text-slate-400 focus:border-emerald-400 outline-none" placeholder="Full Name" />

                </div>

                <div>

                  <label className="text-sm font-semibold text-slate-300">Email *</label>

                  <input type="email" name="email" value={formState.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-emerald-400 outline-none" placeholder="you@example.com" />

                </div>

              </div>



              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                <div>

                  <label className="text-sm font-semibold text-slate-300">Phone Number</label>

                  <input name="phone" value={formState.phone} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-emerald-400 outline-none" placeholder="+919876543210" />

                </div>

                <div>

                  <label className="text-sm font-semibold text-slate-300">Location</label>

                  <input name="location" value={formState.location} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-emerald-400 outline-none" placeholder="City, Country" />

                </div>

              </div>



              <div>

                <label className="text-sm font-semibold text-slate-300">Education</label>

                <input name="education" value={formState.education} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-emerald-400 outline-none" placeholder="B.Tech Computer Science" />

              </div>



              <div>

                <label className="text-sm font-semibold text-slate-300">Role*</label>

                <input name="role" value={formState.role} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-emerald-400 outline-none" placeholder="Software Intern / DevOps Intern" />

              </div>



              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                <div>

                  <label className="text-sm font-semibold text-slate-300">LinkedIn Profile</label>

                  <input name="linkedin" value={formState.linkedin} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-emerald-400 outline-none" placeholder="https://linkedin.com/in/yourname" />

                </div>

                <div>

                  <label className="text-sm font-semibold text-slate-300">Portfolio Website</label>

                  <input name="portfolio" value={formState.portfolio} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-emerald-400 outline-none" placeholder="https://yourportfolio.com" />

                </div>

              </div>



              <div>

                <label className="text-sm font-semibold text-slate-300">Resume / CV *</label>

                <input type="file" accept="application/pdf" onChange={handleFile} className="mt-1 w-full text-sm text-slate-300" />

                <p className="text-xs text-slate-500">Max file size 10MB. PDF only.</p>

              </div>



              <div>

                <label className="text-sm font-semibold text-slate-300">Cover letter</label>

                <textarea name="cover_letter" value={formState.cover_letter} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-emerald-400 outline-none" rows={4} placeholder="Tell us why you're a great fit" />

              </div>



              <div className="flex items-center gap-2">

                <input type="checkbox" name="terms" checked={formState.terms} onChange={handleChange} className="h-4 w-4 accent-emerald-400" />

                <label className="text-sm text-slate-300">I agree to be contacted about internship opportunities.</label>

              </div>



              {success && <p className="text-sm text-emerald-300">{success}</p>}

              {error && <p className="text-sm text-red-400">{error}</p>}



              <div className="sticky bottom-0 left-0 right-0 mt-4 bg-slate-900/95 py-3 backdrop-blur-sm border-t border-slate-700">

                <div className="flex justify-end">

                  <Button type="submit" className="px-6 py-2 text-base font-semibold">Submit Application</Button>

                </div>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};



export default Careers;



