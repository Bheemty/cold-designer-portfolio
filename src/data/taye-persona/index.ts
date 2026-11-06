/**
 * ASK COLD 2.0 — TAYE PERSONA & KNOWLEDGE BASE
 * Central export of all modular knowledge files representing Taye Abolarin (Cold Designer).
 * Organised into maintainable categories for intelligent first-person conversational AI.
 */

import { TAYE_IDENTITY, TayeIdentity } from "./identity";
import { TAYE_PERSONALITY, TayePersonality } from "./personality";
import { TAYE_PHILOSOPHY, DesignPhilosophy } from "./philosophy";
import { TAYE_SKILLS, TayeSkills } from "./skills";
import { TAYE_EXPERIENCE } from "./experience";
import { TAYE_PROJECTS, DetailedProjectKnowledge } from "./projects";
import { TAYE_WORKING_STYLE, TayeWorkingStyle } from "./workingStyle";
import { TAYE_AMBITIONS, TayeAmbitions } from "./ambitions";
import { TAYE_CHALLENGING_INQUIRIES, ChallengingInquiry } from "./challengingInquiries";

export interface CompleteTayePersona {
  identity: TayeIdentity;
  personality: TayePersonality;
  philosophy: DesignPhilosophy;
  skills: TayeSkills;
  experience: typeof TAYE_EXPERIENCE;
  projects: DetailedProjectKnowledge[];
  workingStyle: TayeWorkingStyle;
  ambitions: TayeAmbitions;
  challengingInquiries: ChallengingInquiry[];
  lastReviewed: string;
}

export const TAYE_PERSONA: CompleteTayePersona = {
  identity: TAYE_IDENTITY,
  personality: TAYE_PERSONALITY,
  philosophy: TAYE_PHILOSOPHY,
  skills: TAYE_SKILLS,
  experience: TAYE_EXPERIENCE,
  projects: TAYE_PROJECTS,
  workingStyle: TAYE_WORKING_STYLE,
  ambitions: TAYE_AMBITIONS,
  challengingInquiries: TAYE_CHALLENGING_INQUIRIES,
  lastReviewed: "2026-11-06",
};

export {
  TAYE_IDENTITY,
  TAYE_PERSONALITY,
  TAYE_PHILOSOPHY,
  TAYE_SKILLS,
  TAYE_EXPERIENCE,
  TAYE_PROJECTS,
  TAYE_WORKING_STYLE,
  TAYE_AMBITIONS,
  TAYE_CHALLENGING_INQUIRIES,
};

export type {
  TayeIdentity,
  TayePersonality,
  DesignPhilosophy,
  TayeSkills,
  DetailedProjectKnowledge,
  TayeWorkingStyle,
  TayeAmbitions,
  ChallengingInquiry,
};
