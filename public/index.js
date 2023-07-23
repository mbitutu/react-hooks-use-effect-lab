import React, { useState, useEffect } from 'react';

function Question({ questionText, possibleAnswers, onAnswered }) {
    const [timeRemaining, setTimeRemaining] = useState(10);

    useEffect(() => {
        // Set up the timer using setTimeout
        const timer = setTimeout(() => {
            // Decrease the time remaining by 1 every second
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        // Cleanup function to clear the timer when the component unmounts or when timeRemaining hits 0
        return () => {
            clearTimeout(timer);
        };
    }, [timeRemaining]); // Add timeRemaining as a dependency to re-run the effect when it changes

    useEffect(() => {
        // When timeRemaining hits 0, reset the timer and trigger onAnswered(false) in the App component
        if (timeRemaining === 0) {
            setTimeRemaining(10);
            onAnswered(false);
        }
    }, [timeRemaining, onAnswered]); // Add timeRemaining and onAnswered as dependencies to re-run the effect when they change

    return (
        <div>
            <p>{questionText}</p>
            <ul>
                {possibleAnswers.map((answer, index) => (
                    <li key={index}>{answer}</li>
                ))}
            </ul>
            <p>Time Remaining: {timeRemaining}</p>
        </div>
    );
}

export default Question;
