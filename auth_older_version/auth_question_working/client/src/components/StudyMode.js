import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL
const GIPHY_KEY = process.env.REACT_APP_SEARCH_IMAGE_GIPHY_API_KEY

const Study = (props) => {
    const [cards, setCards] = useState([]);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');

    const [imagePaste, setImagePaste] = useState(false);
    const [imageSearch, setImageSearch] = useState(false);

    const [showSearch, setShowSearch] = useState(false);
    const [showPaste, setShowPaste] = useState(false);

    useEffect(() => {
        showAll();
    }, []);

    useEffect(() => {
        console.log("Image state has changed:", image);
    }, [image]);

    const showAll = async () => {
        try {
            const {user_id } = localStorage;
            const res = await fetch(`${BASE_URL}/api/cards/${user_id}`);
            const data = await res.json();
            if (data.length > 0) {
                setCards(data);
            } else {
                console.error("No cards available - study");
            }
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
                console.log(giphyImageNew);
                setImage(giphyImageNew);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const addCard = async (e) => {
        e.preventDefault()
        const { user_id } = localStorage;
        console.log(`test2:${image}`)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image, name, user_id }),
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

        setShowPaste(false)
    }

    const activateImagePaste = () => {
        setImagePaste(true);

        setShowSearch(false);
        setShowPaste(true);
    };

    const exitImagePaste = () => {
        setImagePaste(false);
        // setImage('');

        setShowPaste(false);
    };

    const activateImageSearch = () => {
        setImageSearch(true);

        setShowSearch(true);
        setShowPaste(false);
    };

    const exitImageSearch = () => {
        setImageSearch(false);
        setImage('');

        setShowSearch(false);
    };

    return (
        <div>
            <div className="linkNav">
                <Link to="/homepage2" className="link">HomePage</Link>
                <Link to="/quiz" className="link">Quiz</Link>
                <Link to="/" className="link">Logout</Link>
            </div>

            <h1>Time to study some new words!</h1><br />
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
                                console.log("on submit image url,",e.target[0].value)
                                // console.log(`test 3a, ${image}`)
                                // setImage("hello world")
                                // console.log(`test 3b, ${image}`)
                                // setImage(e.target[0].value)
                                // console.log(`test 3c, ${image}`)

                                // addCard(e);
                                exitImagePaste();
                            }}>
                                {showPaste && (
                                    <>
                                        Image URL: <input value={image} onChange={(e) => setImage(e.target.value)} />
                                        <input type="submit" value="Enter" className="save" />
                                    </>
                                )}
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
                                {showSearch && (
                                    <>
                                        Search GIF: <input onChange={(e) => setImage(e.target.value)} />
                                        <button type="submit">Enter</button>
                                    </>
                                )}
                            </form>
                        </div>
                    ) : null}

                    <form onSubmit={addCard}>
                        Word: <input value={name} onChange={(e) => setName(e.target.value)} /><br />
                        <input type="submit" value="Save Card" className="save" />
                    </form>
                </div>
            </div>

            {cards.length === 0 ? (
                <div>
                    <p className="emptyCardCollection">Your Card Collection is empty.</p>
                </div>
            ) : (
                <>
                    <h3>Your Card Collection</h3>
                    {cards.map(item => {
                        // console.log(`test 1 : ${item.image}`)
                        return (
                            <div className="cardCollection"
                                key={item.card_id}>
                                <h4 className="word">{item.name}</h4>
                                <img src={item.image || "../defaultImage.png"} alt="Image is not available" width="90" height="90" className="cardCollectionImage" /><br />
                                <Link to={`/${item.card_id}`} className="editLinkonCard">Edit</Link>
                            </div>
                        )
                    })}
                    <br />
                </>
            )}
        </div>
    );
};

export default Study;