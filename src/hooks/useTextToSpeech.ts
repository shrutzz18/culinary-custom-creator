
const API_KEY = "sk_c9cd72331798e6ca5fd40617a72b135b532b878ae8fb999e";

export const useTextToSpeech = () => {
  const speak = async (text: string) => {
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
        throw new Error("Failed to convert text to speech");
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
    } catch (error) {
      console.error("Text-to-speech error:", error);
      throw error;
    }
  };

  return { speak };
};
