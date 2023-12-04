import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Study = (props) => {

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>Here will be card collection with Add Card</h1>
            <p>When you click on card you will be directed to Card.js</p>
            <Link to="/">Back to Homepage</Link>
        </div>

    )
}

export default Study;