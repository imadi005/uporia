'use client';
import { useState } from 'react';
import AudienceSelector from './AudienceSelector';
import EmailEditor from './EmailEditor';
import ScheduleOptions from './ScheduleOptions';

export default function CreateCampaignForm() {
  const [subject, setSubject] = useState('');
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [sendType, setSendType] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState('');

  const handleSubmit = async () => {
    const payload = {
      subject,
      fromName,
      fromEmail,
      body: emailBody,
      audience: selectedSegment,
      schedule: sendType === 'schedule' ? scheduleDate : null,
      status: sendType === 'schedule' ? 'scheduled' : 'sent',
    };

    const res = await fetch('/api/campaigns/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) alert('✅ Campaign sent!');
    else alert('❌ Failed to send campaign');
  };

  const handleSaveDraft = async () => {
    try {
      const payload = {
        subject,
        fromName,
        fromEmail,
        body: emailBody,
        audience: selectedSegment,
        status: 'draft',
      };

      const res = await fetch('/api/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) alert('✅ Draft saved!');
      else alert('❌ Failed to save draft');
    } catch (err) {
      console.error('Error saving draft:', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1b1d20] via-[#2c2e33] to-[#191a1e] p-8 rounded-2xl shadow-2xl border border-gray-700/30 backdrop-blur-md">
      <h2 className="text-2xl font-semibold text-white mb-6 tracking-wide">📨 Create New Campaign</h2>

      <input
        className="w-full mb-4 p-3 rounded-lg bg-[#2e3035] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        placeholder="Email Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        className="w-full mb-4 p-3 rounded-lg bg-[#2e3035] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        placeholder="From Name"
        value={fromName}
        onChange={(e) => setFromName(e.target.value)}
      />
      <input
        className="w-full mb-4 p-3 rounded-lg bg-[#2e3035] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        placeholder="From Email"
        value={fromEmail}
        onChange={(e) => setFromEmail(e.target.value)}
      />

      <AudienceSelector selectedSegment={selectedSegment} setSelectedSegment={setSelectedSegment} />
      <EmailEditor emailBody={emailBody} setEmailBody={setEmailBody} />
      <ScheduleOptions sendType={sendType} setSendType={setSendType} scheduleDate={scheduleDate} setScheduleDate={setScheduleDate} />

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-1/2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition shadow-md"
        >
          🚀 Send Campaign
        </button>

        <button
          onClick={handleSaveDraft}
          className="w-full sm:w-1/2 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition shadow-md"
        >
          💾 Save as Draft
        </button>
      </div>
    </div>
  );
}
