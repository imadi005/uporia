'use client';

type ScheduleOptionsProps = {
  sendType: 'now' | 'schedule';
  setSendType: (val: 'now' | 'schedule') => void;
  scheduleDate: string;
  setScheduleDate: (val: string) => void;
};

export default function ScheduleOptions({
  sendType,
  setSendType,
  scheduleDate,
  setScheduleDate,
}: ScheduleOptionsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-white tracking-wide">🕒 Schedule Options</h3>

      <div className="flex gap-6 mb-4 text-white">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sendOption"
            value="now"
            checked={sendType === 'now'}
            onChange={() => setSendType('now')}
            className="accent-purple-500 w-4 h-4"
          />
          <span className="text-sm">Send Now</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sendOption"
            value="schedule"
            checked={sendType === 'schedule'}
            onChange={() => setSendType('schedule')}
            className="accent-purple-500 w-4 h-4"
          />
          <span className="text-sm">Schedule for Later</span>
        </label>
      </div>

      {sendType === 'schedule' && (
        <input
          type="datetime-local"
          className="w-full p-3 rounded-lg bg-[#2e3035] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
        />
      )}
    </div>
  );
}
