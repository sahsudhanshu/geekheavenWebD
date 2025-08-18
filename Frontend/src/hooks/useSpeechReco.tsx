import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
}

export const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const { showToast } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const startListening = () => {
        if (!recognition) {
            showToast('error', ' Speech recognition is not supported')
            return;
        }
        if (isListening) return;
        setIsListening(true)
        recognition.start()
    }
    const stopListening = () => {
        if (!isListening) return;
        recognition.stop();
        setIsListening(false)
    }
    useEffect(() => {
        if (!recognition) return
        recognition.onresult = (event: any) => {
            const currTranscript = event.results[0][0].transcript;
            setTranscript(currTranscript.toLowerCase())
            stopListening();
        }
        recognition.onerror = (event: any) => {
            setError(event.error);
            stopListening();
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        // Cleanup function
        return () => {
            recognition.onresult = null;
            recognition.onerror = null;
            recognition.onend = null;
        };
    }, []);

    return {
        isListening,
        transcript,
        error,
        startListening,
        stopListening,
        hasRecognitionSupport: recognition,
    };
}