import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL

const Quiz = (props) => {
    const [cards, setCards] = useState([]);
    const [usedCards, setUsedCards] = useState([]);
    const [randomCard, setRandomCard] = useState(null);
    const [answer, setAnswer] = useState('');
    const [count, setCount] = useState(0);
    const [quizMode, setQuizeMode] = useState(false);

    useEffect(() => {
        getCards()
    }, []);

    const getCards = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/cards`);
            const data = await res.json();
            setCards(data)
            if (data && data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomCard = data[randomIndex];
                setRandomImage(randomCard);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const startQuiz = () => {
        setQuizeMode(true);
    }

    const handleAnswer = () => {
        if (answer.toLowerCase() === randomCard.name.toLowerCase()){
            setCount(count + 1);
        }
    }

    return (
        <div>
            <h1>Let's check your knowledge!</h1>
            <button onClick={startQuiz()}>Start</button><br />
            {startQuiz ? (
                { card && card.length > 0 && card.map((item) => {
                    return (
                        <div key={item.id}
                            style={{
                                display: "inline-block",
                                border: "1px solid black",
                                margin: "20px"
                            }}>
                            <img src={item.image} alt="Ivalid Image URL" width="90" height="90" />

                            </div>
                            ):(null)}
                            <Link to="/">Back to Homepage</Link>
                        </div>

                    )
                }

export default Quiz;