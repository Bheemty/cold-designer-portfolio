"use client";

import { useState } from "react";
import { Mail, Check, Copy, ArrowUpRight, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sounds";

const SCOPES = [
  "Conversational UX & Healthtech",
  "Design Systems Architecture",
  "Mobile App Product Design",
  "Web Experience & Prototyping",
  "Product Advisory & Design Audit",
];

const TIMELINES = [
  "Immediate (Next 2-4 Weeks)",
  "Upcoming Month",
  "Quarterly Planning",
  "Flexible Exploration",
];

export default function ContactPage() {
  const [selectedScope, setSelectedScope] = useState(SCOPES[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[1]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const realEmail = "abolarintaye20@gmail.com";

  const handleCopyEmail = () => {
    sound.playChime(750, 0.2);
    navigator.clipboard.writeText(realEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playChime(880, 0.3);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#a9ddf0", "#f2f1ec", "#89919d"],
    });

    setSubmitted(true);

    const subject = encodeURIComponent(`Project Inquiry: ${selectedScope} — ${formData.name || "Inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nScope: ${selectedScope}\nTimeline: ${selectedTimeline}\n\nProject Brief:\n${formData.message}`
    );
    window.location.href = `mailto:${realEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-24 px-6 sm:px-10 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-12 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
              Get In Touch
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] mb-6">
            Start a Conversation.
          </h1>

          <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed max-w-3xl">
            Open for thoughtful product discussions, design systems architecture, and professional dialogue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-8 font-mono-code text-xs">
            {/* Direct Email Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 space-y-4">
              <span className="text-[#89919d] uppercase block">DIRECT EMAIL</span>
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg font-bold text-[#f2f1ec] break-all">{realEmail}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.03] py-2.5 text-[#f2f1ec] hover:border-[#a9ddf0] hover:text-[#a9ddf0] transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className="text-[#a9ddf0]" />
                    <span className="text-[#a9ddf0] font-semibold">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>
            </div>

            {/* Base & Timezone */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 space-y-4">
              <span className="text-[#89919d] uppercase block">LOCATION &amp; TIMEZONE</span>
              <p className="text-[#89919d] text-sm leading-relaxed">
                Based in Lagos, Nigeria (WAT / UTC+1) with comfortable collaboration overlap across European (GMT/CET) and Eastern US (EST) working hours.
              </p>
              <div className="flex items-center gap-2 text-[#a9ddf0]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
                <span className="font-semibold">GLOBAL REMOTE WORK</span>
              </div>
            </div>

            {/* Social & Profiles */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-6 space-y-3">
              <span className="text-[#89919d] uppercase block mb-1">PROFILES &amp; REPOSITORIES</span>
              <div className="space-y-2">
                <a
                  href="https://x.com/taye_abolarin2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                >
                  <span>X (Twitter)</span>
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href="https://www.tiktok.com/@taye_abolarin2?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                >
                  <span>TikTok</span>
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href="https://www.linkedin.com/in/taye-abolarin-b503b0240/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href="https://www.behance.net/Abolarin_Taye_Joseph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                >
                  <span>Behance</span>
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href="https://github.com/Bheemty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center space-y-4 font-mono-code">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/30">
                    <Check size={24} />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec]">Message Drafted</h3>
                  <p className="text-sm text-[#89919d] max-w-md mx-auto">
                    Your email client should open with your drafted message. You can also write directly to{" "}
                    <span className="text-[#a9ddf0]">{realEmail}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex rounded-full bg-white/[0.05] border border-white/[0.08] px-6 py-2 text-xs text-[#f2f1ec] hover:bg-[#a9ddf0] hover:text-[#090b0f] transition-colors"
                  >
                    Draft Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Scope Selector */}
                  <div>
                    <label className="font-mono-code text-xs text-[#89919d] uppercase block mb-3">
                      01 // Project Engagement Scope:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SCOPES.map((sc) => (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setSelectedScope(sc);
                          }}
                          className={`rounded-lg px-3 py-1.5 font-mono-code text-xs transition-colors border ${
                            selectedScope === sc
                              ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#a9ddf0] font-semibold"
                              : "border-white/[0.08] bg-white/[0.03] text-[#89919d] hover:text-[#f2f1ec]"
                          }`}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Selector */}
                  <div>
                    <label className="font-mono-code text-xs text-[#89919d] uppercase block mb-3">
                      02 // Projected Timeframe:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINES.map((tm) => (
                        <button
                          key={tm}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setSelectedTimeline(tm);
                          }}
                          className={`rounded-lg px-3 py-1.5 font-mono-code text-xs transition-colors border ${
                            selectedTimeline === tm
                              ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#a9ddf0] font-semibold"
                              : "border-white/[0.08] bg-white/[0.03] text-[#89919d] hover:text-[#f2f1ec]"
                          }`}
                        >
                          {tm}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-4 font-mono-code text-xs">
                    <div>
                      <label className="text-[#89919d] uppercase block mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-white/[0.08] bg-[#090b0f] p-3.5 text-[#f2f1ec] placeholder-[#89919d]/40 focus:border-[#a9ddf0] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#89919d] uppercase block mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full rounded-xl border border-white/[0.08] bg-[#090b0f] p-3.5 text-[#f2f1ec] placeholder-[#89919d]/40 focus:border-[#a9ddf0] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[#89919d] uppercase block mb-1.5">Company / Project</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Company or venture"
                          className="w-full rounded-xl border border-white/[0.08] bg-[#090b0f] p-3.5 text-[#f2f1ec] placeholder-[#89919d]/40 focus:border-[#a9ddf0] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#89919d] uppercase block mb-1.5">Project Overview / Goals</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about what you are building, design goals, and project scope..."
                        className="w-full rounded-xl border border-white/[0.08] bg-[#090b0f] p-3.5 text-[#f2f1ec] placeholder-[#89919d]/40 focus:border-[#a9ddf0] focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f2f1ec] py-4 font-mono-code text-xs font-semibold text-[#090b0f] hover:bg-[#a9ddf0] transition-colors"
                  >
                    <Send size={14} />
                    <span>Send Project Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
