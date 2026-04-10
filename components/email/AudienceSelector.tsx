'use client';

type AudienceSelectorProps = {
  selectedSegment: string;
  setSelectedSegment: (val: string) => void;
};

export default function AudienceSelector({ selectedSegment, setSelectedSegment }: AudienceSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-white tracking-wide">🎯 Select Audience Segment</h3>
      <select
        className="w-full p-3 rounded-lg bg-[#2e3035] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        value={selectedSegment}
        onChange={(e) => setSelectedSegment(e.target.value)}
      >
        <option value="all">All Subscribers</option>
        <option value="new-users">New Users (Last 30 Days)</option>
        <option value="high-engagers">High Engagers</option>
        <option value="unopened">Didn't Open Last Campaign</option>
        <option value="custom">Custom Tag / Segment</option>
      </select>
    </div>
  );
}
