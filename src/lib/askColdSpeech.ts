/**
 * Browser-native Speech Recognition and Synthesis for Ask Cold
 * Pure Web Speech API — zero paid APIs, zero external trackers, zero stored audio.
 */

// Define SpeechRecognition types for browsers that lack standard window typing
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: { transcript: string };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

interface IWindowSpeech extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  const win = window as IWindowSpeech;
  return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === "undefined") return false;
  return typeof window.speechSynthesis !== "undefined";
}

export interface SpeechRecognizerHandlers {
  onInterimResult?: (transcript: string) => void;
  onFinalResult: (transcript: string) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export class BrowserSpeechRecognizer {
  private recognition: SpeechRecognitionInstance | null = null;
  private isListening: boolean = false;

  constructor(handlers: SpeechRecognizerHandlers) {
    if (!isSpeechRecognitionSupported()) return;

    const win = window as IWindowSpeech;
    const SpeechConstructor = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechConstructor) return;
    this.recognition = new SpeechConstructor();

    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    this.recognition.onstart = () => {
      this.isListening = true;
      handlers.onStart?.();
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (interim) {
        handlers.onInterimResult?.(interim);
      }
      if (final) {
        handlers.onFinalResult(final.trim());
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      this.isListening = false;
      let errMsg = "Speech recognition encountered an issue.";
      if (event.error === "not-allowed") {
        errMsg = "Microphone access was denied. Please allow microphone permission in your browser.";
      } else if (event.error === "no-speech") {
        errMsg = "No speech was detected. Please try speaking again.";
      } else if (event.error === "network") {
        errMsg = "Network connection issue during speech recognition.";
      }
      handlers.onError?.(errMsg);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      handlers.onEnd?.();
    };
  }

  public start(): boolean {
    if (!this.recognition || this.isListening) return false;
    try {
      this.recognition.start();
      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    if (!this.recognition) return;
    try {
      this.recognition.stop();
    } catch {}
    this.isListening = false;
  }

  public abort() {
    if (!this.recognition) return;
    try {
      this.recognition.abort();
    } catch {}
    this.isListening = false;
  }

  public active(): boolean {
    return this.isListening;
  }
}

let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Strips markdown symbols before speech synthesis
 */
function cleanMarkdownForSpeech(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/#+\s*/g, "")
    .replace(/&bull;/g, "")
    .replace(/[>~_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Speaks text using browser-native SpeechSynthesis with natural voice preference
 */
export function speakAssistantResponse(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
) {
  if (!isSpeechSynthesisSupported()) return;

  stopSpeakingAssistant();

  const cleaned = cleanMarkdownForSpeech(text);
  if (!cleaned) return;

  const utterance = new SpeechSynthesisUtterance(cleaned);
  activeUtterance = utterance;

  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Prefer natural English voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel"))) ||
    voices.find((v) => v.lang.startsWith("en-US")) ||
    voices.find((v) => v.lang.startsWith("en"));

  if (preferred) {
    utterance.voice = preferred;
  }

  utterance.onstart = () => {
    callbacks?.onStart?.();
  };

  utterance.onend = () => {
    activeUtterance = null;
    callbacks?.onEnd?.();
  };

  utterance.onerror = () => {
    activeUtterance = null;
    callbacks?.onError?.();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeakingAssistant() {
  if (!isSpeechSynthesisSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {}
  activeUtterance = null;
}

export function isSpeakingAssistant(): boolean {
  if (!isSpeechSynthesisSupported()) return false;
  return !!activeUtterance && window.speechSynthesis.speaking;
}

