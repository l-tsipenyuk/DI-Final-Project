import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL

const Quiz = (props) => {

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>Let's check your knowledge!</h1>
            <Link to="/">Back to Homepage</Link>
        </div>

    )
}

export default Quiz;