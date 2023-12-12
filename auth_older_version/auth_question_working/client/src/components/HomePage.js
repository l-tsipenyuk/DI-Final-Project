import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const HomePage = (props) => {
    
    useEffect(() => {
    }, []);

    return (
        <div>
            <div className="header">
                <h1>Welcome to the Anki App</h1>
                <h4 id="subheader">Add some cards and practice your knowledge!</h4>
            </div>
            <h4>Please sign up or login</h4>
            <Link to="/register">Register</Link><br/>
            <Link to="/login">Login</Link>
        </div>

    )
}

export default HomePage;