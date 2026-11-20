"use client";

import { useRef } from "react";

export interface EndorsementItem {
  quote: string;
  author: string;
  role: string;
  context: string;
}

export const ENDORSEMENTS: EndorsementItem[] = [
  {
    quote:
      "Taye bridges the gap between deep product thinking and crisp execution. His ability to translate ambiguous requirements into intuitive flows—and back them up with working code prototypes—massively accelerated our delivery speed.",
    author: "Tobi Makinde",
    role: "Full-Stack Software Engineer & Founder, Quicck",
    context: "Collaborated on product & front-end delivery",
  },
  /*
  {
    quote:
      "Placeholder for future client/founder endorsement. Taye's systems thinking and rapid prototyping helped de-risk critical product assumptions before writing a single line of production code.",
    author: "Founder / Product Lead",
    role: "Co-Founder & CEO, Technology Venture",
    context: "Collaborated on 0-to-1 product strategy & design systems",
  },
  {
    quote:
      "Placeholder for future engineering lead endorsement. The level of design token discipline and front-end fidelity Taye delivered made implementation completely frictionless.",
    author: "Engineering Director",
    role: "Head of Engineering",
    context: "Collaborated on design tokens & component architecture",
  },
  */
];

export default function EndorsementsKokil() {
  const sectionRef = useRef<HTMLElement>(null);
  const active = ENDORSEMENTS[0];

  return (
    <section ref={sectionRef} id="endorsements" className="endorsements-section">
      <div className="endorsements-inner">
        {/* Section Label */}
        <p className="intro-label">(03) &mdash; Endorsements</p>

        {/* Editorial Pull-Quote */}
        <div className="endorsement-body">
          <blockquote className="endorsement-quote">
            <span className="quote-mark" aria-hidden="true">&ldquo;</span>
            {active.quote}
            <span className="quote-mark" aria-hidden="true">&rdquo;</span>
          </blockquote>

          {/* Author Signature & Collaboration Metadata */}
          <div className="endorsement-meta">
            <div className="endorsement-author-block">
              <h3 className="endorsement-author-name">{active.author}</h3>
              <p className="endorsement-author-role">{active.role}</p>
            </div>

            <div className="endorsement-context-pill">
              <span className="context-indicator" aria-hidden="true" />
              <span>{active.context}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
