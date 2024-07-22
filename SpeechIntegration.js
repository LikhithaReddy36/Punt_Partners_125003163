import React, { useState } from 'react';
import axios from 'axios';
import './SpeechIntegration.css'; // Ensure CSS file is correctly imported

const SpeechIntegration = () => {
    // State variables
    const [translatedText, setTranslatedText] = useState('');
    const [audio, setAudio] = useState('');

    // Function to convert text to speech
    const handleTextToSpeech = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/text-to-speech`, {
                text: translatedText,
            });
            setAudio(response.data.audioUrl); // Ensure the backend returns an audio URL
        } catch (error) {
            console.error('Error converting text to speech:', error);
        }
    };

    return (
        <div className="speech-integration-container">
            <h1>Speech Integration</h1>
            <textarea
                value={translatedText}
                onChange={(e) => setTranslatedText(e.target.value)}
                placeholder="Enter text to convert to speech"
            />
            <br />
            <button onClick={handleTextToSpeech}>Convert to Speech</button>
            {audio && (
                <div>
                    <audio controls>
                        <source src={audio} type="audio/mp3" />
                    </audio>
                </div>
            )}
        </div>
    );
};

export default SpeechIntegration;
