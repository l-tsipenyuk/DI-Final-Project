import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";


const base_url = process.env.REACT_APP_BASE_URL

const Auth = (props) => {

    // ----------
    const { token } = useContext(AppContext);
    // ----------
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        try {

            let newtoken = localStorage.getItem('accesstoken')
            // axios.defaults.headers.common['Authorization'] = newtoken;

            axios.defaults.headers.common['authorization'] = newtoken;

            // const response = await axios.get(`${base_url}/api/users/verify`);
            const response = await axios.get(`/api/users/verify`);
            // const response = await axios.get(`https://anki-app.onrender.com/api/users/verify`);
            console.log("res->", response);
            if (response.status === 201) setRedirect(true);
        } catch (err) {

            console.log(err.response.data);
            setRedirect(false);
            navigate('/login');
        }
    };
    return redirect ? props.children : <h2>Unauthorized User</h2>;
};

export default Auth;



