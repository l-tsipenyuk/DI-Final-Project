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

    const [previewImage, setPreviewImage] = useState('');

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
                // setImage('image1.png');
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
            // setImage('image1.png');
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
        // setImage('');
        // setName('');
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

                // setPreviewImage(giphyImageNew);
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

    useEffect(() => {
        setPreviewImage(image);
    }, [image])

    return (
        <div>

            {card && card.length > 0 && card.map((item) => {
                return (
                    <div key={item.id}
                        style={{
                            display: "inline-block",
                            border: "1px solid black",
                            margin: "20px"
                        }}>
                        <img src={item.image} alt="Ivalid Image URL" width="90" height="90" />
                        <h4>{item.name}</h4>

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
                                            <input type="submit" value="Save" />
                                        </form>
                                    </div>
                                ) : (null)
                                }

                                {/* {imageSearch ? (
                                    <div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            fetchImages(image); 
                                            exitImageSearch();
                                        }}>
                                            Search GIF: <input onChange={(e) => setImage(e.target.value)} />

                                            <div id="gif-preview"></div>
                                            <button type="submit">Go</button>



                                        </form>
                                    </div>
                                ) : null} */}

                                {imageSearch ? (
                                    <div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            fetchImages(image);
                                            exitImageSearch();
                                        }}>
                                            Search GIF: <input onChange={(e) => setImage(e.target.value)} />
                                            <button type="submit">Go</button>
                                            <div id="gif-preview">
                                                <p>GIF Preview:</p>
                                                <img src={image} alt="Invalid Image URL" width="90" height="90" /><br />
                                            </div>


                                        </form>
                                    </div>
                                ) : null}

                                {/* Image URL: <input value={image} onChange={(e) => setImage(e.target.value)} /><br /> */}

                                <form onSubmit={edit}>
                                    Word: <input value={name} onChange={(e) => setName(e.target.value)} /><br />
                                    <input type="submit" value="Save" />
                                </form>

                                <button onClick={exitEditMode}>Cancel Edit</button>

                            </div>
                        ) : (
                            <div>
                                <button onClick={activateEditMode}>Edit</button>
                            </div>
                        )}

                        <div>
                            <button onClick={del}>Delete Card</button>
                        </div><br />

                    </div>
                )
            })}

            <br />
            <Link to="/study">Back to Card Collection</Link>
        </div >

    )
}

export default Card;



// import React, { useEffect, useState, useRef } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const GIPHY_KEY = process.env.REACT_APP_SEARCH_IMAGE_GIPHY_API_KEY;

// const Card = (props) => {
//     const [card, setCard] = useState([]);
//     const [image, setImage] = useState('');
//     const [name, setName] = useState('');
//     const [editMode, setEditMode] = useState(false);
//     const [previewImage, setPreviewImage] = useState('');

//     const [imagePaste, setImagePaste] = useState(false);
//     const [imageSearch, setImageSearch] = useState(false);

//     const [randomPreviewImage, setRandomPreviewImage] = useState('');

//     const param = useParams();
//     const navigate = useNavigate();
//     const previewRef = useRef();

//     useEffect(() => {
//         getCardInfo();
//     }, []);

//     const getCardInfo = async () => {
//         try {
//             const res = await fetch(`${BASE_URL}/api/cards/${param.id}`);

//             if (!res.ok) {
//                 console.error(`Error with data fetching. Status: ${res.status}`);
//                 setCard([]);
//                 setName('');
//                 return;
//             }

//             const data = await res.json();
//             setCard(data);
//             setName(data.name);
//         } catch (e) {
//             console.log('An error occurred:', e);
//             setCard([]);
//             setName('');
//         }
//     };

//     const del = async () => {
//         try {
//             await fetch(`${BASE_URL}/api/cards/${param.id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             });

//             navigate('/study');
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     const activateEditMode = () => {
//         setEditMode(true);
//     };

//     const exitEditMode = () => {
//         setEditMode(false);
//     };

//     const activateImagePaste = () => {
//         setImagePaste(true);
//         setImage('');
//     };

//     const exitImagePaste = () => {
//         setImagePaste(false);
//     };

//     const activateImageSearch = () => {
//         setImageSearch(true);
//         setImage('');
//         setPreviewImage('');
//     };

//     const exitImageSearch = () => {
//         setImageSearch(false);
//         setPreviewImage('');
//     };

//     const fetchImages = async (searchWord) => {
//         try {
//             const res = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchWord}&rating=g&api_key=${GIPHY_KEY}`);
//             const giphyData = await res.json();
//             if (giphyData && giphyData.data.length > 0) {
//                 const randomIndex = Math.floor(Math.random() * giphyData.data.length);
//                 const giphyImageNew = giphyData.data[randomIndex].images.original.url;
//                 setImage(giphyImageNew);
//                 setPreviewImage(giphyImageNew);
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     const fetchRandomImage = async () => {
//         try {
//             const res = await fetch(`https://api.giphy.com/v1/gifs/search?ids=${image}&rating=g&api_key=${GIPHY_KEY}`);
//             const giphyData = await res.json();
//             if (giphyData && giphyData.data.length > 0) {
//                 const randomIndex = Math.floor(Math.random() * giphyData.data.length);
//                 const randomImage = giphyData.data[randomIndex].images.original.url;
//                 setRandomPreviewImage(randomImage);
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     };


//     const edit = async () => {
//         try {
//             const body = {}
//             if (name && name.trim() !== '') {
//                 body.name = name.trim()
//             }
//             if (image && image.trim() !== '') {
//                 body.image = image.trim()
//             }
//             const res = await fetch(`${BASE_URL}/api/cards/${param.id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(body)
//             });
//             const data = await res.json();

//             setCard(data);
//             exitEditMode();
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     return (
//         <div>
//             {card && card.length > 0 && card.map((item) => {
//                 return (
//                     <div key={item.id}
//                         style={{
//                             display: "inline-block",
//                             border: "1px solid black",
//                             margin: "20px"
//                         }}>
//                         <img src={item.image} alt="Invalid Image URL" width="90" height="90" />
//                         <h4>{item.name}</h4>

//                         {editMode ? (
//                             <div>
//                                 <div className="Toggle">
//                                     <button onClick={activateImageSearch}>Search GIF</button>
//                                     <button onClick={activateImagePaste}>Paste Image URL</button>
//                                 </div>

//                                 {imagePaste ? (
//                                     <div>
//                                         <form onSubmit={(e) => {
//                                             e.preventDefault();
//                                             edit(e);
//                                             exitImagePaste();
//                                         }}>
//                                             Image URL: <input value={image} onChange={(e) => setImage(e.target.value)} />
//                                             <input type="submit" value="Save" />
//                                         </form>
//                                     </div>
//                                 ) : null}

//                                 {imageSearch ? (
//                                     <div>
//                                         <form onSubmit={(e) => {
//                                             e.preventDefault();
//                                             fetchImages(image);
//                                             exitImageSearch();
//                                         }}>
//                                             Search GIF: <input onInput={(e) => fetchImages(e.target.value)} />
//                                             {previewImage && (
//                                                 <div id="gif-preview">
//                                                     <p>GIF Preview:</p>
//                                                     <img src={previewImage} alt="Invalid Image URL" width="90" height="90" /><br />
//                                                     <button type="button" onClick={fetchRandomImage}>Show Another GIF</button>
//                                                 </div>
//                                             )}
//                                             <button type="submit">Go</button>
//                                         </form>
//                                     </div>
//                                 ) : null}

//                                 <form onSubmit={edit}>
//                                     Word: <input value={name} onChange={(e) => setName(e.target.value)} /><br />
//                                     <input type="submit" value="Save" />
//                                 </form>

//                                 <button onClick={exitEditMode}>Cancel Edit</button>
//                             </div>
//                         ) : (
//                             <div>
//                                 <button onClick={activateEditMode}>Edit</button>
//                             </div>
//                         )}

//                         <div>
//                             <button onClick={del}>Delete Card</button>
//                         </div><br />
//                     </div>
//                 );
//             })}

//             <br />
//             <Link to="/study">Back to Card Collection</Link>
//         </div>
//     );
// }

// export default Card;


