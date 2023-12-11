import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const HomePage2 = (props) => {

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>Welcome to the Anki App</h1>
            <h4>Add some cards and practice your knowledge!</h4>
            <p>Please sign up or login</p>
            {/* <Link to="/register">Register</Link><br />
            <Link to="/login">Login</Link> */}

            <Link to="/quiz">Quiz Mode</Link><br/>
            <Link to="/study">Study Mode</Link>

        </div>

    )
}

export default HomePage2;