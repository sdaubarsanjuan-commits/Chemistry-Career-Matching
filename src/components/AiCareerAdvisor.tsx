import React, { useState } from 'react';
import { Career, StudentProfile } from '../types';
import { Sparkles, Send, Bot, User } from 'lucide-react';

interface AiCareerAdvisorProps {
  topCareers: Career[];
  profile: StudentProfile;
  onOpenCareer: (career: Career) => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiCareerAdvisor: React.FC<AiCareerAdvisorProps> = ({
  topCareers,
  profile,
}) => {
  const careerNames = topCareers.map((c) => c.title).join(', ');

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I'm your AI Chemistry Career Counselor. Based on your disciplines (${profile.selectedSubjects.join(', ') || 'All Disciplines'}), interests (${profile.selectedInterests.join(', ') || 'All Interests'}), and hobbies (${profile.selectedHobbies.join(', ') || 'General'}), we synthesized 80 chemistry fields down to your Top 5:\n\n**${careerNames}**\n\nHow can I help guide your journey? You can ask me how to prepare in high school, compare daily bench routines, explore required college degrees, or identify summer research opportunities!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const samplePrompts = [
    'How do I prepare in high school for these 5 careers?',
    'Compare the daily routines and work environments.',
    'What college majors should I consider for these options?',
    'What hands-on laboratory skills should I develop early?',
  ];

  const handleSend = async (queryText?: string) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('high school') || q.includes('prepare') || q.includes('course') || q.includes('grade')) {
        reply = `Here is your high school action plan tailored for your Top 5 pathways (**${careerNames}**):\n\n` +
          `1. **Core Science Foundation**: Prioritize AP/IB Chemistry, AP Biology, and AP Physics. Solid mastery of stoichiometry, reaction equilibria, and chemical bonding is essential.\n` +
          `2. **Math & Computation**: Enroll in AP Calculus and Statistics. Early exposure to Python, R, or data modeling gives you a significant advantage in modern analytical labs.\n` +
          `3. **Competitions & Clubs**: Join your school's Science Olympiad or Chemistry Club, and participate in the **US National Chemistry Olympiad (USNCO)** local examination in March.\n` +
          `4. **Laboratory Shadowing**: Reach out to university chemistry departments or local environmental/clinical testing laboratories for high school summer shadowing opportunities.`;
      } else if (q.includes('compare') || q.includes('daily') || q.includes('routine') || q.includes('environment')) {
        reply = `Here is a daily work breakdown across your top 5 options:\n\n` +
          topCareers.map((c, i) => (
            `**#${i + 1} ${c.title}** (${c.workEnvironment})\n• *Chemical Focus*: ${c.chemistrySubfield}\n• *Daily Routine*: ${c.dayInTheLife}`
          )).join('\n\n') +
          `\n\n**Strategic Takeaway**: Choose your pathway based on whether you prefer continuous hands-on wet-lab synthesis, computational simulation, or field/clinical application!`;
      } else if (q.includes('major') || q.includes('college') || q.includes('university') || q.includes('degree')) {
        reply = `For college planning, these 5 pathways share strong foundational majors:\n\n` +
          `1. **B.S. in Chemistry (ACS Certified)**: The most versatile degree. Opens doors to synthetic research, analytical testing, and graduate programs.\n` +
          `2. **B.S. in Biochemistry / Molecular Biology**: Ideal for biomedical, pharmaceutical, cosmetic, and agricultural formulations.\n` +
          `3. **Chemical Engineering (ChemE)**: Ideal for scale-up, materials synthesis, and industrial clean-energy deployment.\n` +
          `4. **Materials Science & Engineering (MSE)**: Directly aligns with nanotechnology, batteries, and polymers.\n\n` +
          `💡 *Pro Tip*: Look for universities with active undergraduate research programs (NSF REU grants) so you can get paid lab experience as a college sophomore!`;
      } else if (q.includes('skill') || q.includes('lab') || q.includes('hands-on') || q.includes('technique')) {
        reply = `Essential lab proficiencies that will accelerate your path across your Top 5:\n\n` +
          topCareers.map((c) => (
            `• **${c.title}**: ${c.topSkills.join(', ')}`
          )).join('\n') +
          `\n\nMastering basic pipetting, spectroscopic interpretation (NMR, IR, Mass Spec), and laboratory notebook hygiene will set you apart from day one.`;
      } else {
        reply = `Regarding "${query}":\n\nYour top five specializations—**${careerNames}**—represent prime frontiers in modern chemistry. Each addresses crucial real-world challenges in health, sustainability, and technological innovation.\n\nFeel free to ask for specific college coursework recommendations, summer internships, or high school science fair project ideas!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          timestamp: 'Just now',
        },
      ]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-xs border border-[#0F172A]">
            <Bot className="w-5 h-5 text-[#38BDF8]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">
              AI Chemistry Career Counselor
            </h3>
            <p className="text-xs text-[#64748B]">
              Interactive guidance on your Top 5 careers, college majors, and high school roadmap
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#F8FAFC] text-[#0284C7] border border-[#BAE6FD] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
          Top 5 Tailored Advisor
        </span>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
          Suggested Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1] font-mono transition-colors text-left cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-4 max-h-[420px] overflow-y-auto p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0 mt-0.5 text-[#0F172A]">
                <Bot className="w-4 h-4 text-[#0284C7]" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#0F172A] text-white font-medium shadow-xs'
                  : 'bg-white border border-[#CBD5E1] text-[#334155] shadow-xs whitespace-pre-wrap'
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-[#0284C7] animate-spin" />
            </div>
            <div className="bg-white border border-[#CBD5E1] p-3 rounded-lg text-xs text-[#64748B] italic font-mono">
              Synthesizing chemical curricula and career pathways...
            </div>
          </div>
        )}
      </div>

      {/* Query Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask a question about these 5 chemistry pathways (e.g., 'What internships should I seek?')..."
          className="flex-1 bg-white border border-[#CBD5E1] focus:border-[#0F172A] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all font-sans"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isThinking}
          className="px-5 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs disabled:opacity-50 transition-all cursor-pointer border border-[#0F172A]"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
