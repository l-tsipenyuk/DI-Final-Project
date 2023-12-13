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
            <div>
                <br/>
                <Link to="/register" className="homePageLoginRegister">Register</Link>
                <Link to="/login" className="homePageLoginRegister">Login</Link>
            </div>
        </div>

    )
}

export default HomePage;