import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Quiz = () => {
    const [cards, setCards] = useState([]);
    const [shuffledCards, setShuffledCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [count, setCount] = useState(0);
    const [quizMode, setQuizMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/cards`);
                const data = await response.json();

                if (data.length > 0) {
                    setCards(data);
                } else {
                    console.error("No cards available");
                }
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (quizMode && cards.length > 0) {
            const shuffled = [...cards].sort(() => Math.random() - 0.5);
            setShuffledCards(shuffled);
            setCurrentCardIndex(0);
        }
    }, [quizMode, cards]);

    const getRandomCard = () => {
        if (currentCardIndex < shuffledCards.length) {
            const currentCard = shuffledCards[currentCardIndex];
            setCurrentCardIndex((prevIndex) => prevIndex + 1);
            return currentCard;
        }
        return null;
    };

    const startQuiz = () => {
        setQuizMode(true);
        setCount(0);
        setAnswer("");
        setCurrentCardIndex(0);
    };

    const resetQuiz = () => {
        setQuizMode(false);
        setCount(0);
        setAnswer("");
        setCurrentCardIndex(0);
    };

    const handleAnswer = () => {
        const currentCard = shuffledCards[currentCardIndex];

        if (currentCard && answer.toLowerCase() === currentCard.name.toLowerCase()) {
            setCount((prevCount) => prevCount + 1);
        }

        const nextCard = getRandomCard();
        if (!nextCard) {
            setQuizMode(false);
        }

        setAnswer("");
    };

    return (
        <div>
            <div className="linkNav">
                <Link to="/" className="link">HomePage</Link>
                <Link to="/study" className="link">Card Collection</Link>
            </div>
            <h1>Let's check your knowledge!</h1>

            {quizMode ? (
                <div className="quizCard">
                    {currentCardIndex < shuffledCards.length ? (
                        <>
                            <img
                                src={shuffledCards[currentCardIndex].image}
                                alt="Invalid Image URL"
                                width="90"
                                height="90"
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="Type the word"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                            <button onClick={handleAnswer}>Next</button>
                            <p>Score: {count}/{cards.length}</p>
                        </>
                    ) : (
                        <>
                            <p>This is your final score: {count}/{cards.length}</p>
                            <button onClick={resetQuiz}>Click to practice again</button>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <button onClick={startQuiz} className="start">Start</button>
                    <br />
                </>
            )}
            <img src="../quizImage.jpg" alt="Invalid Image URL" id="quizImage" />
        </div>
        
    );
};

export default Quiz;



