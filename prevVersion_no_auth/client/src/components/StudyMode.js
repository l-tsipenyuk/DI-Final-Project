import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL
const GIPHY_KEY = process.env.REACT_APP_SEARCH_IMAGE_GIPHY_API_KEY

const Study = (props) => {
    const [cards, setCards] = useState([]);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');

    const [imagePaste, setImagePaste] = useState(false);
    const [imageSearch, setImageSearch] = useState(false);

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

    const fetchImages = async (searchWord) => {
        try {
            const res = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchWord}&rating=g&api_key=${GIPHY_KEY}`);
            const giphyData = await res.json();
            if (giphyData && giphyData.data.length > 0) {
                const randomIndex = Math.floor(Math.random() * giphyData.data.length);
                const giphyImageNew = giphyData.data[randomIndex].images.original.url;
                setImage(giphyImageNew);
            }
        } catch (e) {
            console.log(e);
        }
    }

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
            showAll()
        } catch (e) {
            console.log(e);
        }

        setName('');
        setImage('');
    }

    const activateImagePaste = () => {
        setImagePaste(true);
    };

    const exitImagePaste = () => {
        setImagePaste(false);
        setImage('');
    };

    const activateImageSearch = () => {
        setImageSearch(true);
    };

    const exitImageSearch = () => {
        setImageSearch(false);
        setImage('');
    };

    return (
        <div>
            <div className="linkNav">
                <Link to="/" className="link">HomePage</Link>
                <Link to="/quiz" className="link">Quiz</Link>
            </div>

            <h1>Time to study some new words!</h1>
            <div className="newCard">
                <div className="linkIcon">
                    <img src="../add.png" alt="Invalid Image URL" className="icon" />
                    <p>Add a new card:</p>
                </div>

                <div>
                    <div className="Toggle">
                        <p>
                            Image:
                            <button onClick={activateImageSearch}>Search GIF</button>
                            <button onClick={activateImagePaste}>Paste Image URL</button></p>
                    </div>

                    {imagePaste ? (
                        <div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                addCard(e);
                                exitImagePaste();
                            }}>
                                Image URL: <input value={image} onChange={(e) => setImage(e.target.value)} />
                                <input type="submit" value="Save" />
                            </form>
                        </div>
                    ) : (null)
                    }

                    {imageSearch ? (
                        <div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                fetchImages(image);
                                exitImageSearch();
                            }}>
                                Search GIF: <input onChange={(e) => setImage(e.target.value)} />
                                <button type="submit">Go</button>
                            </form>
                        </div>
                    ) : null}

                    <form onSubmit={addCard}>
                        Word: <input value={name} onChange={(e) => setName(e.target.value)} /><br />
                        <input type="submit" value="Save" className="save" />
                    </form>

                </div>
            </div>

            <h3>Your Card Collection</h3>

            {cards.map(item => {
                return (
                    <div className="cardCollection"
                        key={item.card_id}>
                        <h4 className="word">{item.name}</h4>
                        <img src={item.image} alt="Ivalid Image URL" width="90" height="90" className="cardCollectionImage" /><br />
                        <Link to={`/${item.card_id}`} className="editLinkonCard">Edit</Link>
                    </div>
                )
            })}
            <br />

        </div>

    )
}

export default Study;