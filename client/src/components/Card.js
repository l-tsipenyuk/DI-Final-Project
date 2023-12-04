import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL

const Card = (props) => {
    const [card, setCard] = useState([]);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [editMode, setEditMode] = useState(false);

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
                setImage('image1.png');
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
            setImage('image1.png');
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
            // change this after making card collection!!!
            navigate('/');
            // change this!!!
        } catch (e) {
            console.log(e)
        }
    }

    const activateEditMode = () => {
        setEditMode(true);
    };

    const exitEditMode = () => {
        setEditMode(false);
        setImage('');
        setName('');
    }

    const edit = async (e) => {
        e.preventDefault();
        try {

            const body = {}
            if (name && name.trim() !==''){
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
            setImage(data.image);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h1>Card</h1>

            {card && card.length > 0 && card.map((item) => {
                return (
                    <div key={item.id}>
                        <img src={item.image} alt="Ivalid Image URL" width="90" height="90" />
                        <h4>{item.name}</h4>
                    </div>
                )
            })}

            {editMode ? (
                <div>

                    <form onSubmit={edit}>
                        Image URL: <input value={image} onChange={(e) => setImage(e.target.value)} /><br />
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
            <Link to="/">Back to HomePage</Link>
        </div>

    )
}

export default Card;