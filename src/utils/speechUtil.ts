/**
 * Native Browser Web Speech API Utility - 100% Free, zero external API costs.
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function playEnglishSpeech(
  text: string,
  rate: number = 0.95,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment');
    return false;
  }

  try {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const cleanText = text
      .replace(/["*#_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = rate; // 0.8 for slow practice, 0.95 for normal
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) ||
      voices.find((v) => v.lang.startsWith('en-GB') || v.lang.startsWith('en-US') || v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      currentUtterance = null;
      onError?.();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Speech synthesis error:', err);
    onError?.();
    return false;
  }
}

export function stopEnglishSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
