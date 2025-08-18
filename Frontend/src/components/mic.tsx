import React from 'react';
import { useSpeech } from '../context/speechContext';



const VoiceControlButton: React.FC = () => {
    const { isListening, stopListening, startListening } = useSpeech()

    return (
        <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-full transition ${isListening ? 'bg-red-500 text-white' : 'text-gray-100 hover:bg-gray-100 hover:text-gray-800'}`}
            
        >
            {/* Microphone Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 6v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
            </svg>
        </button>
    );
};

export default VoiceControlButton;