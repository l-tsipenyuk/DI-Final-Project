import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL

const Study = (props) => {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        showAll();
    }, []);

    const showAll = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/cards`);
            const data = await res.json();
            setCards(data)
        } catch (e) {
            console.log(e);
        }
    }

    // check search on server!

    const addCard = async (e) => {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image, name }),
        };

        try {
            const res = await fetch(`${BASE_URL}/api/cards`, options);
            const data = await res.json();
            setCards(data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h1>Time to study some new words!</h1>
            <p>Add a new card.</p>
            <form onSubmit={addCard}>
                Image: <input onChange={(e) => setImage(e.target.value)} /><br/>
                Word: <input onChange={(e) => setName(e.target.value)} />
                <input type="submit" value="Add" />
            </form>
            <h4>Your Card Collection</h4>

            {cards.map(item => {
                return (
                    <div
                        key={item.id}
                        style={{
                            display: "inline-block",
                            border: "1px solid black",
                            margin: "20px"
                        }}>
                        <h4>{item.name}</h4>
                        <img src={item.image} alt="Ivalid Image URL" width="90" height="90" /><br />
                        <Link to={`/${item.id}`}>Edit</Link>
                    </div>
                )
            })}
            <br />
            <Link to="/">Back to Homepage</Link>
        </div>

    )
}

export default Study;