"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, ArrowRight, ArrowLeft, Mail, AlertCircle, Sparkles } from "lucide-react";
import { sound } from "@/lib/sounds";

interface AskColdEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmittedMessage?: (summaryText: string) => void;
}

const PROJECT_TYPES = [
  "Mobile Application (iOS / Android)",
  "SaaS Web Platform",
  "Design System & Architecture",
  "Healthcare / Fintech UX",
  "Product Redesign & Optimization",
  "Design Consultation",
];

export default function AskColdEnquiryModal({
  isOpen,
  onClose,
  onSubmittedMessage,
}: AskColdEnquiryModalProps) {
  const [step, setStep] = useState<"form" | "review" | "success">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !description.trim()) {
      setErrorMsg("Please fill in your name, email, and a brief description.");
      return;
    }
    setErrorMsg(null);
    sound.playClick();
    setStep("review");
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    sound.playClick();

    const payload = {
      name: name.trim(),
      email: email.trim(),
      projectType,
      description: description.trim(),
      timeline: timeline.trim(),
      source: "Ask Cold AI Representative",
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStep("success");
        sound.playChime();
        onSubmittedMessage?.(
          `Project enquiry received from **${name}** (${email}) for *${projectType}*. Taye has been notified and will reply shortly.`
        );
      } else {
        // Fallback: server email was unconfigured or returned warning
        const subject = encodeURIComponent(`Project Enquiry: ${projectType} from ${name}`);
        const body = encodeURIComponent(
          `Hi Taye,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nTimeline/Budget: ${timeline || "Not specified"}\n\nProject Overview:\n${description}\n\nSent via Ask Cold Portfolio Representative`
        );
        const mailto = `mailto:abolarintaye20@gmail.com?subject=${subject}&body=${body}`;
        setFallbackMailto(mailto);
        setStep("success");
      }
    } catch {
      // Network issue fallback
      const subject = encodeURIComponent(`Project Enquiry: ${projectType} from ${name}`);
      const body = encodeURIComponent(
        `Hi Taye,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nTimeline/Budget: ${timeline || "Not specified"}\n\nProject Overview:\n${description}\n\nSent via Ask Cold Portfolio Representative`
      );
      setFallbackMailto(`mailto:abolarintaye20@gmail.com?subject=${subject}&body=${body}`);
      setStep("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setDescription("");
    setTimeline("");
    setStep("form");
    setFallbackMailto(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="absolute inset-0 z-50 rounded-3xl p-6 flex flex-col justify-between overflow-y-auto overscroll-contain animate-in fade-in duration-200 bg-[var(--bg-primary,#090b0f)]/95 backdrop-blur-2xl"
      style={{ overscrollBehavior: "contain" }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--accent,#a9ddf0)] uppercase tracking-wider font-semibold">
            <Sparkles size={13} />
            <span id="enquiry-modal-title">Work With Taye &bull; Project Enquiry</span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              handleReset();
            }}
            className="p-1 rounded-full text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] transition-colors"
            aria-label="Close enquiry modal"
          >
            <X size={16} />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-mono-code text-xs flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: FORM */}
        {step === "form" && (
          <form onSubmit={handleProceedToReview} className="space-y-4 font-sans text-xs">
            <p className="text-[var(--text-secondary,#89919d)] leading-relaxed">
              Tell Ask Cold a few basics about what you&apos;re building. We&apos;ll present a summary to review before it is dispatched to Taye.
            </p>

            <div>
              <label htmlFor="enq-name" className="block font-mono-code text-[11px] text-[var(--accent,#a9ddf0)] mb-1">
                YOUR NAME *
              </label>
              <input
                id="enq-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-[var(--text-primary,#f2f1ec)] focus:outline-none focus:border-[var(--accent,#a9ddf0)] transition-colors text-xs"
              />
            </div>

            <div>
              <label htmlFor="enq-email" className="block font-mono-code text-[11px] text-[var(--accent,#a9ddf0)] mb-1">
                EMAIL ADDRESS *
              </label>
              <input
                id="enq-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. sarah@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-[var(--text-primary,#f2f1ec)] focus:outline-none focus:border-[var(--accent,#a9ddf0)] transition-colors text-xs"
              />
            </div>

            <div>
              <label htmlFor="enq-type" className="block font-mono-code text-[11px] text-[var(--accent,#a9ddf0)] mb-1">
                PROJECT TYPE
              </label>
              <select
                id="enq-type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#11141b] border border-white/[0.1] text-[var(--text-primary,#f2f1ec)] focus:outline-none focus:border-[var(--accent,#a9ddf0)] transition-colors text-xs"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#11141b] text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="enq-desc" className="block font-mono-code text-[11px] text-[var(--accent,#a9ddf0)] mb-1">
                BRIEF PROJECT OVERVIEW *
              </label>
              <textarea
                id="enq-desc"
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What are the goals, target users, or key problems you are looking to solve?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-[var(--text-primary,#f2f1ec)] focus:outline-none focus:border-[var(--accent,#a9ddf0)] transition-colors text-xs resize-none"
              />
            </div>

            <div>
              <label htmlFor="enq-timeline" className="block font-mono-code text-[11px] text-[var(--accent,#a9ddf0)] mb-1">
                TIMELINE OR BUDGET (OPTIONAL)
              </label>
              <input
                id="enq-timeline"
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g. Q2 launch, 4–8 weeks"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-[var(--text-primary,#f2f1ec)] focus:outline-none focus:border-[var(--accent,#a9ddf0)] transition-colors text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-[var(--btn-primary-bg,#FDFDFD)] text-[var(--btn-primary-fg,#090b0f)] font-mono-code font-semibold hover:bg-[var(--accent,#a9ddf0)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Review Enquiry Summary</span>
              <ArrowRight size={13} />
            </button>
          </form>
        )}

        {/* STEP 2: REVIEW SUMMARY */}
        {step === "review" && (
          <div className="space-y-4 font-mono-code text-xs">
            <p className="font-sans text-[var(--text-secondary,#89919d)] text-xs leading-relaxed">
              Please review your enquiry summary. Once confirmed, this will be dispatched to Taye Abolarin.
            </p>

            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span className="text-[var(--text-secondary,#89919d)]">SENDER:</span>
                <span className="text-[var(--text-primary,#f2f1ec)] font-semibold">{name}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span className="text-[var(--text-secondary,#89919d)]">EMAIL:</span>
                <span className="text-[var(--text-primary,#f2f1ec)]">{email}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span className="text-[var(--text-secondary,#89919d)]">PROJECT:</span>
                <span className="text-[var(--accent,#a9ddf0)]">{projectType}</span>
              </div>
              {timeline && (
                <div className="flex justify-between border-b border-white/[0.04] pb-2">
                  <span className="text-[var(--text-secondary,#89919d)]">TIMELINE:</span>
                  <span className="text-[var(--text-primary,#f2f1ec)]">{timeline}</span>
                </div>
              )}
              <div className="pt-1">
                <span className="text-[var(--text-secondary,#89919d)] block mb-1">OVERVIEW:</span>
                <p className="font-sans text-[11px] text-[var(--text-primary,#f2f1ec)] bg-black/30 p-2.5 rounded-lg border border-white/[0.04] leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setStep("form");
                }}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl border border-white/[0.1] text-[var(--text-secondary,#89919d)] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={12} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-[var(--btn-primary-bg,#FDFDFD)] text-[var(--btn-primary-fg,#090b0f)] font-semibold hover:bg-[var(--accent,#a9ddf0)] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Send</span>
                    <Send size={12} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS OR DIRECT FALLBACK */}
        {step === "success" && (
          <div className="space-y-4 py-4 text-center font-sans text-xs">
            <div className="h-12 w-12 rounded-full bg-[var(--accent,#a9ddf0)]/20 text-[var(--accent,#a9ddf0)] flex items-center justify-center mx-auto mb-2 border border-[var(--accent,#a9ddf0)]/30">
              <CheckCircle2 size={24} />
            </div>

            <h3 className="font-display text-xl font-bold text-[var(--text-primary,#f2f1ec)]">
              Enquiry Prepared!
            </h3>

            {fallbackMailto ? (
              <div className="space-y-3 text-[var(--text-secondary,#89919d)]">
                <p>
                  Direct server delivery requires an active email service key, but I have prepared your complete message!
                </p>
                <a
                  href={fallbackMailto}
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--accent,#a9ddf0)] text-[#090b0f] font-mono-code font-semibold hover:opacity-90 transition-opacity shadow-md"
                >
                  <Mail size={14} />
                  <span>Send via Your Email App</span>
                </a>
                <p className="text-[11px] text-[var(--text-muted,#565d6b)]">
                  Destination: abolarintaye20@gmail.com
                </p>
              </div>
            ) : (
              <p className="text-[var(--text-secondary,#89919d)] leading-relaxed">
                Thank you, {name}. Your collaboration inquiry has been routed to Taye. He typically replies within 24–48 hours.
              </p>
            )}

            <div className="pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl border border-white/[0.1] text-[var(--text-primary,#f2f1ec)] font-mono-code hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                Return to Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

