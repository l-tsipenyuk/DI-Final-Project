import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL

const Quiz = (props) => {
    const [cards, setCards] = useState([]);
    const [usedCards, setUsedCards] = useState([]);
    const [randomCard, setRandomCard] = useState(null);
    const [answer, setAnswer] = useState('');
    const [count, setCount] = useState(0);
    const [quizMode, setQuizMode] = useState(false);

    useEffect(() => {
        if (quizMode) {
            getCards()
        } else {
            setRandomCard(null);
        }
    }, [quizMode]);

    useEffect(() => {
        if (quizMode && cards.length > 0) {
            getRandomCard();
        }
    }, [quizMode, cards]);

    const getCards = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/cards`);
            const data = await res.json();

            if (data.length > 0) {
                setCards(data);
                setUsedCards([]);;
                if (quizMode) {
                    getRandomCard();
                }
            } else {
                setCards([]);
                setUsedCards([]);
                setRandomCard(null);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getRandomCard = () => {
        const cardsAvailable = cards
            .map((_, index) => index)
            .filter((_, index) => !usedCards.includes(index))

        if (cardsAvailable.length === 0) {
            setUsedCards([]);
        }

        const randomIndex = Math.floor(Math.random() * cardsAvailable.length);
        const randomCardIndex = cardsAvailable[randomIndex];

        setRandomCard(cards[randomCardIndex]);
        setUsedCards([...usedCards, randomCardIndex]);
    }

    const startQuiz = () => {
        setQuizMode(true);
        setUsedCards([]);
        setCount(0);
        setAnswer("");
        if (cards.length > 0) {
            getRandomCard();
        }
        // console.log('quiz mode =>', quizMode)
    }

    const resetQuiz = () => {
        setQuizMode(false);
        setUsedCards([]);
        setCount(0);
        setAnswer("");
    }

    const handleAnswer = () => {
        if (answer.toLowerCase() === randomCard.name.toLowerCase()) {
            setCount(count + 1);
        }

        if (usedCards.length === cards.length) {
            setAnswer("");
        } else {
            getRandomCard();
            setAnswer("");
        }
    }

    useEffect(() => {
        console.log("quiz mode =>", quizMode);
    }, [quizMode]);

    return (
        <div>
            <h1>Let's check your knowledge!</h1>
            {quizMode ? (
                <div>
                    {randomCard && cards.length !== 0 ? (
                        <>
                            <img src={randomCard.image} alt="Ivalid Image URL" width="90" height="90" /><br />
                            <input type="text" placeholder="Type the word from picture" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                            <button onClick={handleAnswer}>Next</button>
                            <p>Score: {count}/{cards.length}</p>
                        </>
                    ) : (
                        <>
                            <>
                                <p>This is your final score: {count}/{cards.length}</p>
                                <button onClick={resetQuiz}>Click to practice again</button>
                            </>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <button onClick={startQuiz}>Start</button><br />
                </>
            )}
            <Link to="/">Back to Homepage</Link>
        </div>
    );
}

export default Quiz;