
const API_KEY = "sk_c9cd72331798e6ca5fd40617a72b135b532b878ae8fb999e";

export const useTextToSpeech = () => {
  const speak = async (text: string) => {
    try {
      // First try with ElevenLabs
      try {
        const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": API_KEY,
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_turbo_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5
            }
          }),
        });

        if (!response.ok) {
          console.log("ElevenLabs API error:", await response.json());
          throw new Error("Failed to convert text to speech with ElevenLabs");
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();

        // Clean up the URL object when audio ends
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
        
        return audio;
      } catch (elevenLabsError) {
        console.error("ElevenLabs error:", elevenLabsError);
        
        // Fall back to browser's speech synthesis
        console.log("Falling back to browser speech synthesis");
        return useBrowserSpeechSynthesis(text);
      }
    } catch (error) {
      console.error("Text-to-speech error:", error);
      throw error;
    }
  };

  // Browser's built-in speech synthesis as a fallback
  const useBrowserSpeechSynthesis = (text: string): Promise<HTMLAudioElement> => {
    return new Promise((resolve, reject) => {
      // Check if browser supports speech synthesis
      if (!('speechSynthesis' in window)) {
        reject(new Error("Browser doesn't support speech synthesis"));
        return;
      }

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0; // Normal speaking rate
      utterance.pitch = 1.0; // Normal pitch
      utterance.volume = 1.0; // Full volume
      
      // Get available voices (English preferred)
      let voices = window.speechSynthesis.getVoices();
      if (!voices.length) {
        // If voices aren't loaded yet, wait for them
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          setVoice(voices);
        };
      } else {
        setVoice(voices);
      }
      
      function setVoice(availableVoices: SpeechSynthesisVoice[]) {
        // Try to find a nice English voice
        const englishVoice = availableVoices.find(voice => 
          voice.lang.includes('en') && (voice.name.includes('Google') || voice.name.includes('Female'))
        );
        
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }

      // Create a fake audio element to mimic the ElevenLabs implementation
      const fakeAudio = document.createElement('audio');
      
      // Start speaking
      utterance.onstart = () => {
        console.log("Speech synthesis started");
      };
      
      utterance.onend = () => {
        console.log("Speech synthesis ended");
        // Create a fake onended event like the Audio element would have
        if (fakeAudio.onended) {
          fakeAudio.onended(new Event("ended"));
        }
        resolve(fakeAudio);
      };
      
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        reject(new Error("Failed to speak text using browser speech synthesis"));
      };
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
      
      resolve(fakeAudio);
    });
  };

  return { speak };
};
