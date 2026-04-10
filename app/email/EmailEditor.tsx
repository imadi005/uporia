'use client';

type EmailEditorProps = {
  emailBody: string;
  setEmailBody: (val: string) => void;
};

export default function EmailEditor({ emailBody, setEmailBody }: EmailEditorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-white tracking-wide">📝 Email Body</h3>
      <textarea
        className="w-full min-h-[200px] p-4 rounded-lg bg-[#2e3035] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
        placeholder="Write your email content here..."
        value={emailBody}
        onChange={(e) => setEmailBody(e.target.value)}
      />
      <p className="text-sm text-gray-400 mt-2">
        You can use variables like <code className="text-purple-400">{'{name}'}</code>, <code className="text-purple-400">{'{email}'}</code>
      </p>
    </div>
  );
}
