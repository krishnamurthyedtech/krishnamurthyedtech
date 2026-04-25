import React, { useState, useEffect } from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { webinarsApi, WebinarSessionCreate, WebinarSessionResponse } from '../api';
import { Calendar, Clock, Users, Plus, Edit, Trash2 } from 'lucide-react';

const AdminWebinars: React.FC = () => {
  const [sessions, setSessions] = useState<WebinarSessionResponse[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<WebinarSessionResponse | null>(null);
  const [formData, setFormData] = useState<WebinarSessionCreate>({
    title: '',
    description: '',
    date: '',
    time: '',
    meeting_link: '',
    is_active: true,
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const data = await webinarsApi.getSessions();
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSession) {
        await webinarsApi.updateSession(editingSession.id, formData);
      } else {
        await webinarsApi.createSession(formData);
      }
      resetForm();
      fetchSessions();
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      meeting_link: '',
      is_active: true,
    });
    setEditingSession(null);
    setIsCreateModalOpen(false);
  };

  const editSession = (session: WebinarSessionResponse) => {
    setEditingSession(session);
    setFormData({
      title: session.title,
      description: session.description,
      date: session.date,
      time: session.time,
      meeting_link: session.meeting_link || '',
      is_active: session.is_active,
    });
    setIsCreateModalOpen(true);
  };

  const deleteSession = async (id: number) => {
    if (window.confirm('Are you sure you want to deactivate this webinar session?')) {
      try {
        await webinarsApi.deleteSession(id);
        fetchSessions();
      } catch (error) {
        console.error('Failed to delete session:', error);
      }
    }
  };

  return (
    <div className="pt-24 pb-20">
      <Section containerClassName="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-heading font-bold">Webinar Admin</h1>
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
            <Plus size={20} />
            Create New Session
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sessions List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Webinar Sessions</h2>
            <div className="space-y-4">
              {sessions.map((session) => (
                <Card key={session.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{session.title}</h3>
                      <p className="text-slate-300 mb-4">{session.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {session.time}
                        </span>
                      </div>
                      {session.meeting_link && (
                        <div className="mt-2">
                          <a 
                            href={session.meeting_link} 
                            target="_blank" 
                            className="text-blue-400 hover:text-blue-300 underline text-sm"
                          >
                            Meeting Link: {session.meeting_link}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => editSession(session)}
                        className="flex items-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteSession(session.id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                        Deactivate
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Create/Edit Form */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-2xl bg-slate-900 rounded-xl border border-white/20 p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {editingSession ? 'Edit Webinar Session' : 'Create Webinar Session'}
                  </h2>
                  <Button variant="outline" onClick={resetForm}>
                    ×
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Webinar Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white focus:border-blue-500 outline-none"
                      placeholder="Enter webinar title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white focus:border-blue-500 outline-none h-32"
                      placeholder="Enter webinar description"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Date *
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white focus:border-blue-500 outline-none"
                        placeholder="April 15, 2026"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Time *
                      </label>
                      <input
                        type="text"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white focus:border-blue-500 outline-none"
                        placeholder="10:00 AM IST"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Meeting Link
                    </label>
                    <input
                      type="text"
                      value={formData.meeting_link}
                      onChange={(e) => setFormData({...formData, meeting_link: e.target.value})}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white focus:border-blue-500 outline-none"
                      placeholder="https://meet.kmedtech.com/session-name"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="h-4 w-4 accent-blue-500"
                    />
                    <label htmlFor="is_active" className="text-sm text-slate-300">
                      Active
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      {editingSession ? 'Update Session' : 'Create Session'}
                    </Button>
                    <Button variant="outline" type="button" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default AdminWebinars;
