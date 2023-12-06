import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const HomePage = (props) => {
    
    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>Welcome to the Anki App</h1>
            <h4>Add some cards and practice your knowledge!</h4>
            <Link to="/quiz">Quiz Mode</Link><br/>
            <Link to="/study">Study Mode</Link>
        </div>

    )
}

export default HomePage;