import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL
const GIPHY_KEY = process.env.REACT_APP_SEARCH_IMAGE_GIPHY_API_KEY

const Card = (props) => {
    const [card, setCard] = useState([]);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [editMode, setEditMode] = useState(false);

    const [imagePaste, setImagePaste] = useState(false);
    const [imageSearch, setImageSearch] = useState(false);

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCardInfo();
    }, []);

    const getCardInfo = async () => {
        try {
            const res = await (fetch(`${BASE_URL}/api/cards/${param.id}`));

            if (!res.ok) {
                console.error(`Error with data fetching. Status: ${res.status}`);
                setCard([]);
                setName('');
                return;
            }

            const data = await res.json();
            setCard(data);
            setName(data.name);
        }
        catch (e) {
            console.log('An error occured:', e);
            setCard([]);
            setName('');
        }
    };

    const del = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/cards/${param.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

            navigate('/study');

        } catch (e) {
            console.log(e)
        }
    }

    const activateEditMode = () => {
        setEditMode(true);
    };

    const exitEditMode = () => {
        setEditMode(false);
    };

    // -----methods to handle image search/image URL paste-----

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

    const exitImageSearch = async () => {
        setImageSearch(false);
        await setImage('');
    };

    // --------------------------------------------------------

    const fetchImages = async (searchWord) => {
        try {
            const res = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchWord}&rating=g&api_key=${GIPHY_KEY}`);
            const giphyData = await res.json();
            if (giphyData && giphyData.data.length > 0) {
                const randomIndex = Math.floor(Math.random() * giphyData.data.length);
                const giphyImageNew = giphyData.data[randomIndex].images.original.url;
                setImage(giphyImageNew);
            }
        } catch (e) { console.log(e) }
    }

    const edit = async () => {
        try {
            const body = {}
            if (name && name.trim() !== '') {
                body.name = name.trim()
            }
            if (image && image.trim() !== '') {
                body.image = image.trim()
            }
            const res = await fetch(`${BASE_URL}/api/cards/${param.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
            const data = await res.json();

            setCard(data);
            exitEditMode();
        } catch (e) {
            console.log(e);
        }
    }

    // useEffect(() => {
    //     setPreviewImage(image);
    // }, [image])

    return (
        <div>
            <div className="linkNav">
                <Link to="/" className="link">HomePage</Link>
                <Link to="/quiz" className="link">Quiz</Link>
                <Link to="/study" className="link">Card Collection</Link>
            </div>

            {card && card.length > 0 && card.map((item) => {
                return (
                    <div className="cardCollection" key={item.card_id}
                    >
                        <h4>{item.name}</h4>
                        <img src={item.image} alt="Ivalid Image URL" width="90" height="90" className="cardCollectionImage" />

                        {editMode ? (
                            <div>

                                <div className="Toggle">
                                    <button onClick={activateImageSearch}>Search GIF</button>
                                    <button onClick={activateImagePaste}>Paste Image URL</button>
                                </div>

                                {imagePaste ? (
                                    <div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            edit(e);
                                            exitImagePaste();
                                        }}>
                                            Image URL: <input value={image} onChange={(e) => setImage(e.target.value)} />
                                            <input type="submit" value="Save" className="save" />
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

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    edit(e);
                                    exitEditMode();
                                    navigate('/study'); 
                                }}>
                                    Word: <input value={name} onChange={(e) => setName(e.target.value)} /><br />
                                    <input type="submit" value="Save" className="save" />
                                </form>

                                <button onClick={exitEditMode}>Cancel Edit</button>

                            </div>
                        ) : (
                            <div>
                                <button onClick={activateEditMode} className="editLink">Edit</button>
                            </div>
                        )}

                        <div>
                            <button onClick={del}>Delete Card</button>
                        </div><br />

                    </div>
                )
            })}
        </div >
    )
}

export default Card;


