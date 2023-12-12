import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const HomePage2 = (props) => {

    useEffect(() => {
    }, []);

    return (
        <div>
            <div className="header">
                <h1>Welcome to the Anki App</h1>
                <h4 id="subheader">Add some cards and practice your knowledge!</h4>
            </div>
            <div className="linksHomePage">
                <div className="linkIcon">
                    <img src="../study.png" alt="Invalid Image URL" className="icon" />
                    <Link to="/study" className="startLinks">Study Mode</Link><br /><br />
                </div>
                <div className="linkIcon">
                    <img src="../quiz.png" alt="Invalid Image URL" className="icon" />
                    <Link to="/quiz" className="startLinks">Quiz Mode</Link>
                </div>
                <div className="linkIcon">
                    <Link to="/" className="startLinks">Logout</Link>
                </div>
            </div>
            <img src="../image2.jpg" alt="Invalid Image URL" id="startImage" />
        </div>

    )
}

export default HomePage2;

