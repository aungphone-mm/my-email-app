import { useState } from 'react';
import { Send, Copy, Check, Mail, Sparkles, MessageSquare, User } from 'lucide-react';

export default function EmailWriterApp() {
  const [rawThoughts, setRawThoughts] = useState('');
  const [tone, setTone] = useState('professional');
  const [contextEmail, setContextEmail] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showContext, setShowContext] = useState(false);

  const tones = [
    { value: 'professional', label: 'Professional', description: 'Clear and business-appropriate' },
    { value: 'warm', label: 'Warm', description: 'Friendly and approachable' },
    { value: 'concise', label: 'Concise', description: 'Brief and to the point' },
    { value: 'formal', label: 'Formal', description: 'Traditional and respectful' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
    { value: 'persuasive', label: 'Persuasive', description: 'Compelling and convincing' },
  ];

  const generateEmail = async () => {
    if (!rawThoughts.trim()) return;
    setIsLoading(true);
    try {
      const contextPart = contextEmail.trim()
        ? `\n\nContext - I am responding to this email:\n"${contextEmail}"\n\n`
        : '';

      const prompt = `You are an expert email writer. Transform the following raw thoughts into a well-crafted email with a ${tone} tone.\n\nRaw thoughts: "${rawThoughts}"${contextPart}\n\nInstructions:\n- Write a complete, professional email body\n- Use a ${tone} tone throughout\n- Make it clear, engaging, and well-structured\n- Ensure proper email etiquette\n- Do not include a subject line\n\nRespond with ONLY the email body content. No explanations or extra text.`;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || data.error || `API error ${res.status}`);
      }

      setGeneratedEmail(data.content[0].text.trim());
    } catch (err) {
      console.error(err);
      setGeneratedEmail(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generateEmail();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Aung Phone Email Writing Assistant</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Transform your thoughts into polished, professional emails with AI assistance
        </p>
        <div className="inline-flex items-center gap-3 mt-4">
        <a
          href="https://www.aungphone.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          www.aungphone.com
        </a>
        <a
          href="https://github.com/aungphone-mm/my-email-app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          github.com/aungphone-mm/my-email-app
        </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left Column */}
          <div className="space-y-6">

            {/* Thoughts Input */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Your Thoughts</h2>
              </div>
              <textarea
                value={rawThoughts}
                onChange={(e) => setRawThoughts(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write what you want to communicate... Don't worry about grammar or structure - just get your ideas down."
                className="w-full h-40 p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 text-slate-700 placeholder-slate-400"
              />
              <p className="mt-3 text-sm text-slate-500">💡 Tip: Press Cmd/Ctrl + Enter to generate</p>
            </div>

            {/* Tone Selection */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Email Tone</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {tones.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      tone === t.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-slate-200 bg-white/50 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-medium text-slate-800">{t.label}</div>
                    <div className="text-sm text-slate-600 mt-1">{t.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Context (Optional) */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-800">Context (Optional)</h2>
                </div>
                <button
                  onClick={() => setShowContext(!showContext)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showContext ? 'Hide' : 'Show'}
                </button>
              </div>
              {showContext && (
                <textarea
                  value={contextEmail}
                  onChange={(e) => setContextEmail(e.target.value)}
                  placeholder="Paste the original email you're replying to..."
                  className="w-full h-32 p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 bg-white/50 text-slate-700 placeholder-slate-400"
                />
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={generateEmail}
              disabled={isLoading || !rawThoughts.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Crafting your email...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Generate Email
                </>
              )}
            </button>
          </div>

          {/* Right Column — Output */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 min-h-96">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-800">Generated Email</h2>
                </div>
                {generatedEmail && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
                  >
                    {copied ? <><Check className="w-4 h-4 text-green-600" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                  </button>
                )}
              </div>

              {generatedEmail ? (
                <div className="bg-white/80 rounded-xl p-6 border border-slate-200">
                  <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                    {generatedEmail}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <Mail className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg">Your polished email will appear here</p>
                  <p className="text-sm mt-2">Enter your thoughts and select a tone to get started</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-800 mb-3">✨ Pro Tips</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Be specific about what you want to achieve</li>
                <li>• Include key details even if roughly written</li>
                <li>• Try different tones to see what works best</li>
                <li>• Add context for more personalized responses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
