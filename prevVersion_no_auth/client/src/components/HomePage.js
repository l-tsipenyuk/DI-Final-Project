import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const HomePage = (props) => {

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>Welcome to the Anki App</h1>
            <h4>Add some cards and practice your knowledge!</h4>
            <div className="linksHomePage">
                <div className="linkIcon">
                    <img src="../study.png" alt="Invalid Image URL" className="icon" />
                    <Link to="/study" className="startLinks">Study Mode</Link><br /><br />
                </div>
                <div className="linkIcon">
                    <img src="../quiz.png" alt="Invalid Image URL" className="icon" />
                    <Link to="/quiz" className="startLinks">Quiz Mode</Link>
                </div>
            </div>
            <img src="../image2.jpg" alt="Invalid Image URL" id="startImage" />
        </div>

    )
}

export default HomePage;