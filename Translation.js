import React, { useState } from 'react';
import axios from 'axios';
import './Translation.css'; // Ensure CSS file is correctly imported

const Translation = () => {
    // State variables
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish
    const [detectedLanguage, setDetectedLanguage] = useState('');

    // Function to handle translation
    const handleTranslate = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/translate`, {
                text,
                targetLanguage,
            });
            setTranslatedText(response.data.translatedText); // Adjust based on your backend response
        } catch (error) {
            console.error('Error during translation:', error);
        }
    };

    // Function to detect language
    const handleDetectLanguage = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/detect`, {
                text,
            });
            setDetectedLanguage(response.data.detectedLanguage); // Adjust based on your backend response
        } catch (error) {
            console.error('Error detecting language:', error);
        }
    };

    return (
        <div className="translation-container">
            <h1>Language Translation</h1>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to translate"
            />
            <br />
            <button onClick={handleDetectLanguage}>Detect Language</button>
            <p>Detected Language: {detectedLanguage}</p>
            <br />
            <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="ru">Russian</option>
               

                {/* Add more languages as needed */}
            </select>
            <br />
            <button onClick={handleTranslate}>Translate</button>
            <p>Translated Text: {translatedText}</p>
        </div>
    );
};

export default Translation;
