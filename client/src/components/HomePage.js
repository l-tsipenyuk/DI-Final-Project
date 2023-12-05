import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const HomePage = (props) => {
    
    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>Welcome to the Anki App</h1>
            <Link to="/quiz">Quiz Mode</Link><br/>
            <Link to="/study">Study Mode</Link>
        </div>

    )
}

export default HomePage;