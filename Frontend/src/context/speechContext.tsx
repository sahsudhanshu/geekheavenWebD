import React, { createContext, useContext } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechReco";

type SpeechContextType = ReturnType<typeof useSpeechRecognition>;
const SpeechContext = createContext<SpeechContextType | null>(null);

export const useSpeech = () => {
    const ctx = useContext(SpeechContext);
    if (!ctx) throw new Error("useSpeech must be used inside SpeechProvider");
    return ctx;
};

export const SpeechContextProvider: React.Provider<SpeechContextType> = SpeechContext.Provider